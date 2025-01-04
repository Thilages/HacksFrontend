import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const ApplicationDetails = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch application data on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          // Get Firebase ID token
          const idToken = await user.getIdToken();

          // Send request with token in headers
          const response = await axios.get('http://localhost:5000/applications', {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          setApplications(response.data.applications);
        } else {
          setError('User not authenticated');
        }
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="bg-[#202325] p-6 rounded-lg shadow-md ">
      <h2 className="text-2xl text-white mb-4">Application Details</h2>

      {loading && <p className="text-gray-300">Loading applications...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <p className="text-gray-300">No applications found.</p>
      )}

      <div className="overflow-x-scroll">
        <table className="min-w-full bg-[#181a1b] rounded-lg mt-4">
          <thead>
            <tr>
              <th className="text-white py-2 px-4">Leader Name</th>
              <th className="text-white py-2 px-4">Team Name</th>
              <th className="text-white py-2 px-4">Problem Statement</th>
              <th className="text-white py-2 px-4">Team Size</th>
              <th className="text-white py-2 px-4">Email 1</th>
              <th className="text-white py-2 px-4">Email 2</th>
              <th className="text-white py-2 px-4">Phone 1</th>
              <th className="text-white py-2 px-4">Phone 2</th>
              <th className="text-white py-2 px-4">Document Link</th>
              <th className="text-white py-2 px-4">Video Link</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td className="text-gray-300 py-2 px-4">{application.leader_name}</td>
                <td className="text-gray-300 py-2 px-4">{application.team_name}</td>
                <td className="text-gray-300 py-2 px-4">{application.problem_statement}</td>
                <td className="text-gray-300 py-2 px-4">{application.team_size}</td>
                <td className="text-gray-300 py-2 px-4">{application.email1}</td>
                <td className="text-gray-300 py-2 px-4">{application.email2}</td>
                <td className="text-gray-300 py-2 px-4">{application.phone1}</td>
                <td className="text-gray-300 py-2 px-4">{application.phone2}</td>
                <td className="text-gray-300 py-2 px-4">
                  <a href={application.document_link} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                    Document
                  </a>
                </td>
                <td className="text-gray-300 py-2 px-4">
                  <a href={application.video_link} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                    Video
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default ApplicationDetails;
