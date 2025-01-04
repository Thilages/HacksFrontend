// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#181a1b] text-white p-6">
      <h2 className="text-2xl font-semibold text-[#54ea54] mb-8">Admin Panel</h2>
      <ul>
        <li className="mb-6">
          <Link
            to="/admin/user-details"
            className="text-lg text-gray-300 hover:text-white transition"
          >
            User Details
          </Link>
        </li>
        <li className="mb-6">
          <Link
            to="/admin/application-details"
            className="text-lg text-gray-300 hover:text-white transition"
          >
            Application Details
          </Link>
        </li>
        <li className="mb-6">
          <Link
            to="/admin/problem-statement-details"
            className="text-lg text-gray-300 hover:text-white transition"
          >
            Problem Statement Details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
