import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { TextField} from '@mui/material';
import './AddEmployee.css';
import axios from 'axios';
import {toast} from 'react-toastify';

const EditEmployee = () => {
  const intialValue = {
    name: '',
    phone: '',
    email: '',
    dob: '',
  };
  
  const navigate=useNavigate();
  const [formInput, setFormInput] = useState(intialValue);
  const [image,setImage]=useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };
  
  const handleFileChange = e => {
    setImage(e.target.files);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    alert('Employee Updated Successfull!');
    console.log(formInput);
      const formData = new FormData();
      formData.append('name',formInput.name);
      formData.append('phone',formInput.phone);
      formData.append('email',formInput.email);
      formData.append('dob',formInput.dob);
      formData.append('avatar',image);
      console.log(formData);
      console.log(image);
      axios.patch('http://localhost:8000/employee/edit',formData,{
        headers:{
          'Authorization':localStorage.getItem('token'),
        }, 
      })
    .then(res=>{console.log(res);
    })
    .catch(err=>{console.log(err)
      toast(`Error:${err}`);
    });
    //toast('Employee Updated Successfull!')
    navigate('/employee');
     
  };

 return (
    <div className="add-employee">
      {/* <pre>{JSON.stringify(formInput, undefined, 2)}</pre> */}
      <div className="header ">
        <h1>Update employee information</h1>
      </div>
      <div className="form ">
        <form>
        <TextField
            type="text"
            label="Full name"
            id="in"
            name="name"
            value={formInput.name}
            onChange={handleChange}
          />
        
         
          <TextField
            type="text"
            label="Mobile number"
            placeholder='01*********'
            id="in"
            name="phone"
            value={formInput.phone}
            onChange={handleChange}
          />
         
          <TextField
            type="text"
            label="Write email "
            id="in"
            name="email"
            value={formInput.email}
            onChange={handleChange}
          />
       
          <div className='date-of-birth'>
            <label htmlFor='date'>Date of Birth: </label>
            <input type='date'
                id='date'
                name='dob'
                value={formInput.dob}
                onChange={handleChange}
            />
          </div>

          <div className='image-upload'>
            <label htmlFor='image'>Upload image: </label>
            <input type='file'
                id='image'
                name='avatar'
                onChange={handleFileChange}
                />
          </div>
          <div className="btn">
            <button type="submit" id="add" onClick={handleSubmit} >            Save cheanges
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
