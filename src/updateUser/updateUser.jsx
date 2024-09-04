import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './updateUser.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export const UpdateUser = () => {
  const updateUserData = {
    first_name: "",
    email: "",
    phone: "",
    address_1: "",
  };

  const [user, setUser] = useState(updateUserData);
  const navigate = useNavigate();
  const {id} = useParams();
  //console.log(id);

  useEffect(() => {
      axios.get(`http://localhost:8000/user/get-by-id/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
          //console.error('There was an error fetching the data!', err);
          toast.error(err.message, { position: "top-right" });
      });
  }, [id]);

  const inputHandler = (e) => {
    const {name, value} = e.target;

    setUser({ ...user, [name]: value });
  }

  //this code also works
  // const submitForm = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:8000/user/update', user);
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
    await axios.put(`http://localhost:8000/user/update/${id}`, user)
    .then((res)=>{
      toast.success(res.data.message, {position: "top-right"});
      navigate("/");
    })
    .catch((err)=>{
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message, { position: "top-right" }); // Show error message from backend
      } else {
        toast.error('There was an error updating the data!', { position: "top-right" }); // Show generic error message
      }
      //console.error('There was an error updating the data!', err);
    })
  }

  return (
    <div className="addUser boxContainer">
      <Link to="/" className="btn btn-danger">
            Dashboard
      </Link>
      <h1>Update User</h1>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="first_name">Name</label>
          <input type="text" name="first_name" className="form-control" id="name" placeholder="Enter name" value={user.first_name} onChange={inputHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" className="form-control" id="phone" placeholder="Enter phone" value={user.phone} onChange={inputHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" value={user.email} onChange={inputHandler}/>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" name="address_1" className="form-control" id="address" placeholder="Enter address" value={user.address_1} onChange={inputHandler}/>
        </div>
        <button type="submit" className="btn btn-primary w-100" >Submit</button>
      </form>
    </div>
  )
}

export default UpdateUser;