import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';

import { BASE_URL, REGISTER_PATH } from '../../../constants/api';
import { regName, regEmail, replaceSpaces } from '../../../components/common/ValidateInputs';


const url = BASE_URL + REGISTER_PATH;

export default function RegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [regError, setRegError] = useState(null);

  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  async function onSubmit(data) {
    setSubmitting(true);
    setRegError(null);
    
    console.log(data);
    
    try {
      await axios.post(url, data, {headers: {
        'Content-Type': 'application/json'
      }});
      window.location.reload();
    } catch (error) {
      console.log('error: ', error.response.data.errors[0].message);
      setRegError(error.response.data.errors[0].message);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} id='regForm'>
      {regError}
      <fieldset disabled={submitting}>
        <div>
          <div>
            <label htmlFor='name' hidden>Name</label>
            <input
              name='name' 
              id='reg-name'
              placeholder='name'
              onKeyDown={replaceSpaces}
              
              {...register('name', { 
                required: true, 
                pattern: regName })}
            />
            {errors.name && <p>Must not contain punctuation symbols apart from underscore: _</p>}
          </div>
          
          <div>
            <label htmlFor='email' hidden>Email</label>
            <input
              name='email' 
              id='reg-email'
              placeholder='email'
              {...register('email', { 
                required: true, 
                pattern: regEmail })} 
            />
            {errors.email && <p>Must be a valid stud.noroff.no or noroff.no email address</p>}
          </div>
          
          <div>
            <label htmlFor='password' hidden>Password</label>
            <input
              type='password'
              name='password' 
              id='reg-password'
              placeholder='password'
              {...register('password', { 
                required: true, 
                minLength: 8
              })} 
            />
            {errors.password && <p>Must be at least 8 characters</p>}
          </div>
        </div>
        <button id='regBtn'>
        {submitting ? 'Validating...' : 'Submit'}
        </button> 
      </fieldset>
    </form>
  )
};