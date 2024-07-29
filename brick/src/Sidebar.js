import React from 'react';

const Sidebar = ({ side }) => {
  return (
    <div className={`w-64 bg-gray-100 p-4 ${side === 'left' ? 'order-first' : 'order-last'}`}>
      <h2 className="text-lg font-semibold mb-4">Sidebar {side}</h2>
      <ul>
        <li className="mb-2">Link 1</li>
        <li className="mb-2">Link 2</li>
        <li className="mb-2">Link 3</li>
      </ul>
    </div>
  );
};

export default Sidebar;