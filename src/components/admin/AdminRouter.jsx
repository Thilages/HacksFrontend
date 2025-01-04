import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import NotAuthorized from "../Notauthorized";
import Sidebar from './Sidebar';
import { Route, Routes } from 'react-router-dom';
import UserDetails from './UserDetails';
import ApplicationDetails from './ApplicationDetails';
import ProblemStatementDetails from './ProblemStatementDetails';

const AdminRouter = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const checkAdmin = async () => {
      setIsLoading(true);

      try {
        const user = auth.currentUser;

        if (user) {

          const token = await user.getIdToken();


          const response = await axios.get("http://127.0.0.1:5000/admin-emails", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const adminEmails = response.data.adminEmails;


          if (adminEmails.includes(user.email)) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching admin emails or validating user:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    onAuthStateChanged(auth, checkAdmin);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!isAdmin) return <NotAuthorized />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 overflow-hidden">
        <Routes>
          <Route path="user-details" element={<UserDetails />} />
          <Route path="application-details" element={<ApplicationDetails />} />
          <Route path="problem-statement-details" element={<ProblemStatementDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRouter;
