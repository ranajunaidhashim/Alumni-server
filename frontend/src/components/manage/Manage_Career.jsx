import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../../utils/globalurl';


const Manage_Career = () => {
    const [formData, setFormData] = useState({
        id: '',
        company: '',
        job_title: '',
        location: '',
        description: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleBack = () => {
        // navigate("/dashboard/jobs");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform insert operation
        await axios.post(`${baseUrl}/jobs`, formData)
            .then((res) => {
                toast.success(res.data.message)
                setFormData({
                    id: "",
                    company: "",
                    job_title: "",
                    location: "",
                    description: "",
                })
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('An error occurred');
            })
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <div className="container-fluid">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={formData.id} className="form-control" />
                    <div className="row form-group">
                        <div className="col-md-8">
                            <label className="control-label">Company</label>
                            <input type="text" name="company" className="form-control" value={formData.company} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-8">
                            <label className="control-label">Job Title</label>
                            <input type="text" name="job_title" className="form-control" value={formData.job_title} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-8">
                            <label className="control-label">Location</label>
                            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-8">
                            <label className="control-label">Description</label>
                            <textarea name="description" className="text-jqte form-control" value={formData.description} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-outline-danger float-end" onClick={handleBack}>Back</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Manage_Career