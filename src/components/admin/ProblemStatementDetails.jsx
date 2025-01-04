import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const ProblemStatementDetails = () => {
  const [problems, setProblems] = useState([]);
  const [editingProblem, setEditingProblem] = useState(null);

  useEffect(() => {
    // Fetch problem statements from the backend
    const fetchProblems = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const idToken = await user.getIdToken(); // Get Firebase ID token
          const response = await fetch('http://localhost:5000/problems', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${idToken}`, // Use Firebase token in header
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProblems(data.problems || []);
          } else {
            console.error('Failed to fetch problems:', response.status);
          }
        } catch (err) {
          console.error('Error fetching problem statements:', err);
        }
      } else {
        console.log('User not authenticated');
      }
    };

    fetchProblems();
  }, []);

  const handleEdit = (problem) => {
    setEditingProblem(problem); // Set the problem being edited
  };

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        const idToken = await user.getIdToken(); // Get Firebase ID token
        const response = await fetch(`http://localhost:5000/problems/${editingProblem.title}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`, // Use Firebase token in header
          },
          body: JSON.stringify(editingProblem),
        });

        const data = await response.json();
        if (data.error) {
          alert(data.error);
        } else {
          alert('Problem statement updated successfully.');
          setEditingProblem(null); // Exit editing mode
          // Refresh the problems list
          setProblems((prev) =>
            prev.map((problem) =>
              problem.title === editingProblem.title ? editingProblem : problem
            )
          );
        }
      } catch (err) {
        console.error('Error updating problem statement:', err);
      }
    } else {
      console.log('User not authenticated');
    }
  };

  return (
    <div className="bg-[#202325] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-white mb-4">Problem Statement Details</h2>
      <p className="text-gray-300 mb-4">
        This section displays all the problem statements. Admins can edit any details.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Scenario</th>
              <th className="px-4 py-2">Stack</th>
              <th className="px-4 py-2">PDF URL</th> {/* New column for PDF URL */}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.title} className="border-b border-gray-700">
                <td className="px-4 py-2">{problem.title}</td>
                <td className="px-4 py-2">
                  {editingProblem?.title === problem.title ? (
                    <input
                      type="text"
                      value={editingProblem.description}
                      onChange={(e) =>
                        setEditingProblem({
                          ...editingProblem,
                          description: e.target.value,
                        })
                      }
                      className="bg-gray-800 text-white p-2 rounded-md w-full"
                      autoFocus
                    />
                  ) : (
                    problem.description
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingProblem?.title === problem.title ? (
                    <textarea
                      value={editingProblem.details}
                      onChange={(e) =>
                        setEditingProblem({
                          ...editingProblem,
                          details: e.target.value,
                        })
                      }
                      className="bg-gray-800 text-white p-2 rounded-md w-full"
                    />
                  ) : (
                    problem.details
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingProblem?.title === problem.title ? (
                    <input
                      type="text"
                      value={editingProblem.scenario}
                      onChange={(e) =>
                        setEditingProblem({
                          ...editingProblem,
                          scenario: e.target.value,
                        })
                      }
                      className="bg-gray-800 text-white p-2 rounded-md w-full"
                    />
                  ) : (
                    problem.scenario
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingProblem?.title === problem.title ? (
                    <input
                      type="text"
                      value={editingProblem.expectedStack.join(', ')}
                      onChange={(e) =>
                        setEditingProblem({
                          ...editingProblem,
                          expectedStack: e.target.value.split(',').map((item) => item.trim()),
                        })
                      }
                      className="bg-gray-800 text-white p-2 rounded-md w-full"
                    />
                  ) : (
                    problem.expectedStack.join(', ')
                  )}
                </td>
                <td className="px-4 py-2 ">
                  {editingProblem?.title === problem.title ? (
                    <input
                      type="text"
                      value={editingProblem.pdfUrl}
                      onChange={(e) =>
                        setEditingProblem({
                          ...editingProblem,
                          pdfUrl: e.target.value,
                        })
                      }
                      className="bg-gray-800 text-white p-2 rounded-md w-full"
                    />
                  ) : (
                    problem.pdfUrl
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingProblem?.title === problem.title ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-600 px-3 py-1 rounded-md text-white mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProblem(null)}
                        className="bg-red-600 px-3 py-1 rounded-md text-white"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(problem)}
                      className="bg-blue-600 px-3 py-1 rounded-md text-white"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default ProblemStatementDetails;
