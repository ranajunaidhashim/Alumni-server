import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../utils/globalurl';

const AdminSettings = () => {
  const [system, setSystem] = useState({});

  useEffect(() => {
    axios.get(`${baseUrl}/settings`)
      .then((res) => {
        setSystem(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSystem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(system);
  };

  return (
    <>
      {system && (
        <div className="container-fluid">
          <div className="card col-lg-12">
            <div className="card-body">
              <form onSubmit={handleSubmit} id="manage-settings">
                <div className="form-group">
                  <label htmlFor="name" className="control-label">System Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={system.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="control-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={system.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact" className="control-label">Contact</label>
                  <input type="text" className="form-control" id="contact" name="contact" value={system.contact} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="about" className="control-label">About Content</label>
                  <textarea name="about_content" className="form-control text-jqte" value={system.about_content} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="" className="control-label">Image</label>
                  <input type="file" className="form-control" name="img" />
                </div>
                <div className="form-group">
                  <img src={`${baseUrl}/${system.cover_img}`} alt="Cover" id="cimg" />
                </div>
                <center>
                  <button type='submit' className="btn btn-info btn-primary btn-block col-md-2">Save</button>
                </center>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSettings;
