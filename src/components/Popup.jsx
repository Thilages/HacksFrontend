import React from "react";

// Custom Alert Component
export const Alert = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
      <p className="text-gray-800">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
      >
        OK
      </button>
    </div>
  </div>
);

// Custom Confirmation Component
export const Confirmation = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
      <p className="text-gray-800">{message}</p>
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
        >
          No
        </button>
      </div>
    </div>
  </div>
);
