import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#181a1b] to-[#0f1011] px-4 py-12">
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#54ea54] opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#54ea54] opacity-15 blur-2xl rounded-full"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-lg">
        {/* Main Title */}
        <h1 className="text-5xl font-extrabold text-red-500 mb-4">
          Oops! Access Denied
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl font-semibold text-gray-400 mb-6">
          It looks like you're trying to access a restricted page.
        </h2>

        {/* Explanation */}
        <p className="text-lg text-gray-300 mb-8">
          You don't have the necessary permissions to view this content. If you think this is an error, please reach out to support.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <Link
            to="/"
            className="px-6 py-3 text-lg font-medium text-[#181a1b] bg-[#54ea54] rounded-full shadow-lg hover:bg-[#43c943] transition duration-300"
          >
            Go Back to Home
          </Link>

        </div>


      </div>
    </div>
  );
};

export default NotAuthorized;
