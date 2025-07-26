import React from 'react';
import {useNavigate } from 'react-router-dom';

const NotFound = () => {
    // const location = useLocation();
    const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1"><span role="img" aria-label="sad emoji">😢</span></h1>
      <h2>Page Not Found</h2>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => navigate(-1)} className="btn btn-primary d-block mx-auto">Head back</button>
    </div>
  )
}

export default NotFound;
