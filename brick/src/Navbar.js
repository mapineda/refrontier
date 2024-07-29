import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Logo</div>
        <div>
          <button className="bg-white text-blue-500 px-4 py-2 rounded mr-2">Login</button>
          <button className="bg-white text-blue-500 px-4 py-2 rounded">Signup to Save</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;