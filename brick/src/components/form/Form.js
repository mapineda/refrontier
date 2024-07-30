import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import SelectField from './SelectField';
import Results from './Results';

const Form = () => {
  const [showResults, setResults] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    current_weight: '',
    height: '',
    age: '',
    gender: 'male',
    activity_level: 'sedentary',
  });

  const [responseData, setResponseData] = useState({
    bmi: '',
    bmr: '',
    maintenance_colories: '',
  })
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5001/api/calculate', formData, {
        headers: {
          'Content-Type': 'application/json'
          // Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log('Response:', response.data);
      setResults(true);
      setResponseData(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* <InputField type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" /> */}
        {/* <InputField type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" /> */}
        <InputField type="number" name="current_weight" value={formData.current_weight} onChange={handleChange} placeholder="Current Weight (kg)" />
        <InputField type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" />
        <InputField type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
        <SelectField
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
        />
        <SelectField
          name="activity_level"
          value={formData.activity_level}
          onChange={handleChange}
          options={[
            { value: 'sedentary', label: 'Sedentary' },
            { value: 'lightly active', label: 'Lightly Active' },
            { value: 'moderately active', label: 'Moderately Active' },
            { value: 'very active', label: 'Very Active' },
            { value: 'extra active', label: 'Extra Active' },
          ]}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Calculate
        </button>
      </form>
      {showResults && <Results result={responseData}/>}
    </div>
  );
};

export default Form;