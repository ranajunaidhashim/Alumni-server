import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../AuthContext';
import { authUrl } from '../utils/globalurl';

const Login = () => {
    const { login } = useAuth();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.action === 'navtologin') {
            toast.info("Please Login Now");
        }
        return () => {
            location
        }
    }, [location.state]);


    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${authUrl}/login`, values)
            .then((res) => {
                if (res.data.loginStatus) {
                    localStorage.setItem("user_id", res.data.userId);
                    localStorage.setItem("user_type", res.data.userType);
                    localStorage.setItem("user_name", res.data.userName);
                    localStorage.setItem("alumnus_id", res.data.alumnus_id);
                    login();
                    navigate("/", { state: { action: "homelogin" } });
                } else {
                    setErrors(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <ToastContainer position="top-center" />

            <header className="masthead">
                <div className="container-fluid h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end mb-4 page-title">
                            <h3 className="text-white">Login Account</h3>
                            <hr className="divider my-4" />
                            <div className="col-md-12 mb-2 justify-content-center">
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container mt-3 pt-2">
                <div className="col-lg-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="container-fluid col-lg-6 col-md-8 col-sm-10">
                                    <form onSubmit={handleSubmit} id="login-frm">
                                        <div className="form-group">
                                            <label htmlFor="email" className="control-label">
                                                Email
                                            </label>
                                            <input
                                                onChange={(e) => setValues({ ...values, email: e.target.value })}
                                                type="email"
                                                id="email"
                                                name="username"
                                                required
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="control-label">
                                                Password
                                            </label>
                                            <input
                                                onChange={(e) => setValues({ ...values, password: e.target.value })}
                                                type="password"
                                                id="password"
                                                name="password"
                                                required
                                                className="form-control"
                                            />
                                            <div className='text-danger mt-2'>
                                                {errors && errors}
                                            </div>
                                            <small className='mt-2 text-muted '>
                                                Don't have an account? <Link to="/signup">Sign up here</Link>
                                            </small>
                                        </div>
                                        <hr className="divider" />
                                        <div className="row justify-content-center">
                                            <div className="col-md-6 text-center">
                                                <button type="submit" className="btn btn-info btn-block">Login</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
