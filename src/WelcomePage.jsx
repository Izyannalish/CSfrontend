import React from 'react';

const WelcomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-700">✅ Successfully Logged In!</h1>
        <p className="mt-4 text-gray-700">Welcome to the system.</p>
      </div>
    </div>
  );
};

export default WelcomePage;
