import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../utils/globalurl';

const MyAccount = () => {
    const [acc, setAcc] = useState({
        name: '',
        connected_to: "",
        course_id: "",
        email: "",
        gender: "",
        password: "",
        batch: "",
    });
    const [file, setFile] = useState(null);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const alumnus_id = localStorage.getItem("alumnus_id");
        const fetchData = async () => {
            try {
                const alumnusDetailsRes = await axios.get(`${baseUrl}/alumni/${alumnus_id}`);
                const coursesRes = await axios.get(`${baseUrl}/courses`);
                setAcc(alumnusDetailsRes.data);
                setCourses(coursesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally display an error message to the user
            }
        };
        fetchData();
    }, []);


    const handleChange = (e) => {
        setAcc({ ...acc, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        console.log("client")
        event.preventDefault();
        const alumnus_id = localStorage.getItem("alumnus_id");
        const user_id = localStorage.getItem("user_id");
        const pswrd = document.getElementById("pswrd").value
        try {
            const formData = new FormData();
            // if (file) {
                formData.append('avatar', file);
            // }
            formData.append('name', acc.name);
            formData.append('connected_to', acc.connected_to);
            formData.append('course_id', acc.course_id);
            formData.append('email', acc.email);
            formData.append('gender', acc.gender);
            formData.append('password', pswrd);
            formData.append('batch', acc.batch);
            formData.append('alumnus_id', alumnus_id);
            formData.append('user_id', user_id);
            // console.log(pswrd);
            // console.log(acc.password);
            console.log(formData);
            const response = await axios.put(`${baseUrl}/alumni/account`, formData);

            toast.success(response.data.message)
            setFile(null);
            setAcc({
                name: '',
                connected_to: "",
                course_id: "",
                email: "",
                gender: "",
                password: "",
                batch: "",
            });
        } catch (error) {
            toast.error('An error occurred');
            console.error('Error:', error);
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <header className="masthead">
                <div className="container-fluid h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end mb-4 page-title">
                            <h3 className="text-white">Manage Account</h3>
                            <FaStar className='text-white ' />
                            <hr className="divider my-4" />
                        </div>
                    </div>
                </div>
            </header>
            <section className="page-section  bg-dark  text-white mb-0" id="about">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form onSubmit={handleSubmit} className="form-horizontal">
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input onChange={handleChange} type="text" className="form-control" name="name" placeholder="Enter your name" required value={acc.name} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label">Gender</label>
                                    <div className="col-sm-4">
                                        <select onChange={handleChange} className="form-control" name="gender" required value={acc.gender}>
                                            <option disabled value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <label htmlFor="" className="col-sm-2 col-form-label">Batch</label>
                                    <div className="col-sm-4">
                                        <input onChange={handleChange} type="text" className="form-control" name="batch" id="batch" required value={acc.batch} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label">Course Graduated</label>
                                    <div className="col-sm-10">
                                        <select onChange={handleChange} className="form-control select2" name="course_id" required value={acc.course_id}>
                                            <option disabled value="">Select course</option>
                                            {courses.map(c => (
                                                <option key={c.id} value={c.id}>{c.course}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label">Currently Connected To</label>
                                    <div className="col-sm-10">
                                        <textarea onChange={handleChange} name="connected_to" className="form-control" rows="3" placeholder="Enter your current connection" value={acc.connected_to}></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="avatar" className="col-sm-2 col-form-label">Image</label>
                                    <div className="col-sm-10">
                                        <input onChange={handleFileChange} type="file" className="form-control-file" name="avatar" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input onChange={handleChange} type="email" className="form-control" name="email" placeholder="Enter your email" required value={acc.email} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                    {/* <input onChange={handleChange} type="email" className="form-control" name="email" placeholder="Enter your email" required value={acc.password} /> */}
                                        <input onChange={handleChange} id='pswrd'  type="password" className="form-control" name="password" placeholder="Enter your password" />
                                        <small className="form-text text-info fst-italic ">Leave this blank if you dont want to change your password</small>
                                    </div>
                                </div>
                                <div id="msg" className="alert alert-info" role="alert">
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12 text-center">
                                        <button type='submit' className="btn btn-secondary" >Update Account</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyAccount;
