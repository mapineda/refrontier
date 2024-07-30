import React, { useState } from 'react';

const Results = ({ result }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you would typically send a request to your backend
    // For now, we'll just simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
      <p className="font-bold">Results</p>
      {/* <p>{result ? JSON.stringify(result, null, 2) : 'No results available.'}</p> */}
      <div className="mt-4">
        {result && !submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              required
            />
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Email Results
            </button>
          </form>
        ) : (
          <p className="text-green-600 font-semibold">Check your email to download your results!</p>
        )}
      </div>
    </div>
  );
};

export default Results;