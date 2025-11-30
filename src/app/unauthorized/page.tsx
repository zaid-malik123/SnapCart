import React from "react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center">
        
        {/* Icon */}
        <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 14l2-2 2 2m-2-2v6m0-14a9 9 0 100 18 9 9 0 000-18z" />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-semibold text-gray-800 mt-6">
          Access Denied
        </h1>
        <p className="text-gray-600 mt-2">
          You don’t have permission to view this page.
        </p>

        {/* Button */}
        <a
          href="/"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-700 transition-all"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
