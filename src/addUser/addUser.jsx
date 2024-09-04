import React, { useState } from 'react';
import axios from 'axios';
import './addUser.css'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const AddUser = () => {
  const newUserData = {
    first_name: "",
    email: "",
    phone: "",
    address_1: "",
  };

  const [user, setUser] = useState(newUserData);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const {name, value} = e.target;console.log(name, value);

    setUser({ ...user, [name]: value });
  }

  //this code also works
  // const submitForm = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:8000/user/create', user);
  //     if (response.status === 200) {
  //       toast.success(response.data, {position: "top-right"});
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     console.error('There was an error saving the data!', error);
  //   }
  // };

  const submitForm = async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8000/user/create", user)
    .then((res)=>{
      toast.success(res.data.message, {position: "top-right"});
      navigate("/");
    })
    .catch((err)=>{
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message, { position: "top-right" }); // Show error message from backend
      } else {
        toast.error('There was an error saving the data!', { position: "top-right" }); // Show generic error message
      }
      //console.error('There was an error saving the data!', err);
    })
  }

  return (
    <div className="addUser boxContainer">
      <Link to="/" className="btn btn-danger">
            Dashboard
      </Link>
      <h1>Add User</h1>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="first_name">Name</label>
          <input type="text" name="first_name" className="form-control" id="name" placeholder="Enter name" onChange={inputHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" className="form-control" id="phone" placeholder="Enter phone" onChange={inputHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" onChange={inputHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" name="address_1" className="form-control" id="address" placeholder="Enter address" onChange={inputHandler}/>
        </div>
        <button type="submit" className="btn btn-primary w-100" >Submit</button>
      </form>
    </div>
  )
}

export default AddUser;