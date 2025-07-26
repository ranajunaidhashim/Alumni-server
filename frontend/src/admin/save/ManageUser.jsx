import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../../utils/globalurl';


const ManageUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [users, setUsers] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        type: ''
    });

    useEffect(() => {
        if (location.state && location.state.status === 'edit') {
            setUsers(location.state.data);
        }
    }, [location.state]);

    const handleChange = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${baseUrl}/user/${users.id}`, users)
            .then((res) => toast.success(res.data.message))
            .catch((err) => console.log(err))
        setUsers({
            id: '',
            name: '',
            email: '',
            password: '',
            type: ''
        })
    };


    return (
        <>
            <ToastContainer position="top-center" />
            <div className="container-fluid">
                <div id="msg"></div>
                <form onSubmit={handleSubmit} id="manage-user">
                    <input type="hidden" name="id" value="id" />
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" className="form-control" value={users.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="form-control" value={users.email} onChange={handleChange} required autoComplete="off" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="form-control"  onChange={handleChange} autoComplete="off" />
                        <small><i>Leave this if you dont want to change the password.</i></small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">User Type</label>
                        <select onChange={handleChange} className="custom-select" name="type" value={users.type}>
                            <option value="" disabled>Please select type</option>
                            <option value="alumnus">Alumnus</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-outline-danger float-end" onClick={() => navigate("/dashboard/users")}>Back</button>
                </form>
            </div>
        </>
    )
}

export default ManageUser