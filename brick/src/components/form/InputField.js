import React from 'react';

const InputField = ({ name, type, value, onChange, placeholder }) => (
  <input
    className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required
  />
);

export default InputField;