import React from 'react';

const Results = () => (
  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
    <p className="font-bold">Results</p>
    <p>Your body weight calculation results here.</p>
    <div className="mt-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
        Download Results
      </button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Sign Up
      </button>
    </div>
  </div>
);

export default Results;