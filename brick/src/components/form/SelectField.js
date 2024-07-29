import React from 'react';

const SelectField = ({ name, value, onChange, options }) => (
  <select
    className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    name={name}
    value={value}
    onChange={onChange}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
);

export default SelectField;