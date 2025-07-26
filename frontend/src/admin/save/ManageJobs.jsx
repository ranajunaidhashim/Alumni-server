import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import { baseUrl } from '../../utils/globalurl';
// import { useAuth } from '../../AuthContext';


const ManageJobs = ({ setHandleAdd }) => {
  // const { isLoggedIn, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const uid = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    id: '',
    company: '',
    job_title: '',
    location: '',
    description: '',
    user_id: uid,
  });
  const [loading, setLoading] = useState(false);
  const toastId = useRef(null);

  useEffect(() => {
    if (location.state && location.state.action === 'edit') {
      setFormData(location.state.data,);
      console.log(location);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleBack = () => {
    if (location.pathname.startsWith("/dashboard")) {
      navigate("/dashboard/jobs");
    } else {
      console.log("back btn")
      setHandleAdd(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);  // Show loader
    if (!toastId.current) {
      toastId.current = toast('📧 Sending emails, please wait...', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    try {
      if (location.state && location.state.action === 'edit') {
        await axios.put(`${baseUrl}/jobs/${formData.id}`, formData)
          .then((res) => toast.success(res.data.message));
      } else {
        await axios.post(`${baseUrl}/jobs`, formData)
          .then((res) => toast.success(res.data.message));
      }
      setFormData({
        id: "",
        company: "",
        job_title: "",
        location: "",
        description: "",
        user_id: uid,
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
      // console.error('Error:', error);
      // if (error.response) {
      //   // Request was made but server responded with status code outside of 2xx range
      //   toast.error('Server Error. Please try again later.');
      // } else if (error.request) {
      //   // Request was made but no response received (no internet connection)
      //   toast.warn('No internet connection. Data will be saved locally.');
      //   // Perform local data storage or any other necessary action
      // } else {
      //   // Something else happened while setting up the request
      //   toast.error('An error occurred. Please try again later.');
      // }

    } finally {
      setLoading(false);  // Hide loader
      if (toastId.current) {
        toast.dismiss(toastId.current);
        toastId.current = null;
      }
    }
  };


  const handleChangeDesc = (description) => {
    setFormData(prevState => ({
      ...prevState,
      description
    }));
  };


  return (
    <>
      <ToastContainer position="top-center" />
      {/* {loading && <ToastContainer
position="top-center"
autoClose={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable
/> }  */}
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
              {/* <textarea name="description" className="text-jqte form-control" value={formData.description} onChange={handleChange}></textarea> */}
              <ReactQuill
                value={formData.description}
                onChange={handleChangeDesc}
                required
              />
            </div>
          </div>
          <div className='col-md-8'>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-outline-danger float-end  " onClick={handleBack}>Back</button>
          </div>
        </form>
      </div>
    </>

  );
}

export default ManageJobs;
