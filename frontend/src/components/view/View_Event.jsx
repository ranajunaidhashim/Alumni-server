import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCalendar } from "react-icons/fa";
import { useAuth } from '../../AuthContext';
import { baseUrl } from '../../utils/globalurl';

const ViewEvent = () => {
  const { isLoggedIn } = useAuth()

  const location = useLocation();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [participated, setParticipated] = useState(false);

  useEffect(() => {
    if (location.state && location.state.action === "view") {
      setEventData(location.state.data);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state && location.state.data) {
      const eventId = location.state.data.id;
      const userId = localStorage.getItem("user_id");
      const requestData = {
        event_id: eventId,
        user_id: userId
      };

      axios.post(`${baseUrl}/events/participation-check`, requestData)
        .then((res) => {
          setParticipated(res.data.participated)
        })
        .catch((err) => console.log(err))
    }
  }, [location.state]);

  const handleParticipation = () => {
    const eventId = location.state.data.id;
    const userId = localStorage.getItem("user_id");
    const requestData = {
      event_id: eventId,
      user_id: userId
    };

    axios.post(`${baseUrl}/events/participate`, requestData)
      .then((res) => {
        setParticipated(true);
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (timestamp) => {
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(timestamp).toLocaleDateString('en-US', options);
  };

  // console.log(isLoggedIn);

  return (
    <>
      <header className="masthead">
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-4 align-self-end mb-4 pt-2 page-title">
              <h2 className="text-center text-white">
                <b>Event Details</b>
              </h2>
              <hr className="divider my-4" />
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="col-lg-12 card-pad">
          {eventData && (
            <div className="card mt-4 mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 ">
                    <h4 className="text-center">{eventData.title}</h4>
                    <p><i><FaCalendar className='me-2 text-info ' />{formatDate(eventData.schedule)}</i></p>
                    <div dangerouslySetInnerHTML={{ __html: eventData.content }}></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <hr className="divider" />
                    {isLoggedIn ? (
                      <div className="text-center">
                        {participated ? (
                          <span className="badge badge-primary">Committed to Participate</span>
                        ) : (
                          <button className="btn btn-primary" onClick={handleParticipation}>Participate</button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="text-danger ">Please Login to participate</span>
                        <br />
                        <button className="btn btn-primary mt-2" onClick={() => navigate("/login")}>Login</button>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewEvent;
