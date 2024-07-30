import React, {useState} from 'react';
import InputField from './InputField';

const EmailForm = () => {
  const [email, setEmail] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('submitting');
  };

  return (
    <form>
      <InputField placeholder={"Enter Email to Download"}/>
      <button onSubmit={submitHandler}>

      </button>
    </form>
  )
};

export default EmailForm;