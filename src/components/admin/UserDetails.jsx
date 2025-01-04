import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          // Get Firebase ID token
          const idToken = await user.getIdToken();

          // Send request with token in headers
          const response = await axios.get('http://localhost:5000/users', {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          setUsers(response.data.users);
        } else {
          setError('User not authenticated');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const deleteUser = async (uid) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // Get Firebase ID token
        const idToken = await user.getIdToken();

        // Send DELETE request to the backend
        await axios.delete(`http://localhost:5000/delete-user/${uid}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        // Remove the deleted user from the list
        setUsers(users.filter((user) => user.uid !== uid));
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
    }
  };

  return (
    <div className="bg-[#202325] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-white mb-4">User Details</h2>

      {loading && <p className="text-gray-300">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="text-gray-300">No users found.</p>
      )}

      <table className="min-w-full bg-[#181a1b] rounded-lg mt-4">
        <thead>
          <tr>
            <th className="text-white py-2 px-4">Email</th>
            <th className="text-white py-2 px-4">Display Name</th>
            <th className="text-white py-2 px-4">UID</th>
            <th className="text-white py-2 px-4">Created At</th>
            <th className="text-white py-2 px-4"></th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td className="text-gray-300 py-2 px-4">{user.email}</td>
              <td className="text-gray-300 py-2 px-4">{user.displayName || 'N/A'}</td>
              <td className="text-gray-300 py-2 px-4">{user.uid}</td>
              <td className="text-gray-300 py-2 px-4">{user.createdAt}</td>
              <td className="py-2 px-4">
                {/* Delete Button */}
                <button
                  onClick={() => deleteUser(user.uid)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
