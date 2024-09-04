import React, { useEffect, useState } from 'react';
import './getUsers.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/user/all");
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getAllUsers();
    }, []);

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:8000/user/delete/${userId}`)
        .then((res)=>{
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            toast.success(res.data.message, {position: "top-right"});
        })
        .catch((err)=>{
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message, { position: "top-right" }); // Show error message from backend
            } else {
                toast.error('There was an error deleting the data!', { position: "top-right" }); // Show generic error message
            }
        })
    }

  return (
    <div className="userTable boxContainer">
        <Link to="/add-user" className="btn btn-primary">
            Add User <i className="fa-solid fa-user-plus"></i>
        </Link>
        <table className="table table-bordered w-100">
            <thead>
                <tr className="text-center">
                    <th scope="col">Serial No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {users?.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.first_name}</td>
                            <td>{user.email}</td>
                            <td>{user.address_1}</td>
                            <td className="actionButton">
                                <Link to={`/update-user/` + user._id} className="btn btn-info">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button to={`/update-user/` + user.id} className="btn btn-danger" onClick={()=>deleteUser(user._id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
  )
}

export default UserTable;