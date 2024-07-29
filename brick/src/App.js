import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Form from './components/form/Form';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar side="left" />
        <main className="flex-1 p-4">
          <h1 className='text-3xl font-bold mb-4'>Body Weight Calculator</h1>
          <Form />
        </main>
        <Sidebar side="right" />
      </div>
    </div>
  );
};

export default App;