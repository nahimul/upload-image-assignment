import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { TextField} from '@mui/material';
import './AddEmployee.css';
import axios from 'axios';
import {toast} from 'react-toastify';

const AddEmployee = () => {
  const intialValue = {
    name: '',
    phone: '',
    email: '',
    dob: '',
  };
  
  const navigate=useNavigate();
  const [formInput, setFormInput] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted,setIsSubmitted]=useState(false);
  const [image,setImage]=useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };
  
  const handleFileChange = e => {
    setImage(e.target.files[0]);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formInput));
    setIsSubmitted(true);
    if(Object.keys(formErrors).length===0 && isSubmitted){
         console.log(formInput);
         const formData = new FormData();
         alert('Employee added Successfull!');
      formData.append('name',formInput.name);
      formData.append('phone',formInput.phone);
      formData.append('email',formInput.email);
      formData.append('dob',formInput.dob);
      formData.append('avatar',image);
      console.log(formData);
      console.log(image);

      axios.post('http://localhost:8000/employee/add',formData,{
        headers:{
          'Authorization':localStorage.getItem('token'),
        }, 
      })
    .then(res=>{console.log(res);
    })
    .catch(err=>{console.log(err)
      toast(`Error:${err}`);
    });
    //toast('Employee added Successfull!')
    navigate('/employee');
    
  }
};


  const validate = formInput => {
    const errors = {};
    let regex =/^(?:\+88|88)?(01[3-9]\d{8})$/i;
  
    if (!formInput.name) {
      errors.name = 'Last name is Required!';
    }
    if (!formInput.phone) {
      errors.phone = 'Mobile is Required!';
      //checking phone number validation
    }
    else if(!regex.test(formInput.phone)){
      errors.phone = 'This is not a valid number!';
    }
    regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formInput.email) {
      errors.email = 'Email is Required!';
    } else if (!regex.test(formInput.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if(!formInput.dob){
      errors.dob = 'Date of Birth is Required!';
    }
    return errors;
  };

  return (
    <div className="add-employee">
      {/* <pre>{JSON.stringify(formInput, undefined, 2)}</pre> */}
      <div className="header ">
        <h1>Employee Form</h1>
      </div>
      <div className="form ">
        <form >
        <TextField
            type="text"
            label="Full name"
            id="in"
            name="name"
            value={formInput.name}
            onChange={handleChange}
          />
          {formErrors.name && <p id="error">{formErrors.name}</p>}
         
          <TextField
            type="text"
            label="Mobile number"
            placeholder='01*********'
            id="in"
            name="phone"
            value={formInput.phone}
            onChange={handleChange}
          />
          {formErrors.phone && <p id="error">{formErrors.phone}</p>}
          <TextField
            type="text"
            label="Write email "
            id="in"
            name="email"
            value={formInput.email}
            onChange={handleChange}
          />
          {formErrors.email && <p id="error">{formErrors.email}</p>}
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
              multiple  onChange={handleFileChange}
                />
          </div>
          <div className="btn">
            <button type="submit" id="add" onClick={handleSubmit} >
             Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
