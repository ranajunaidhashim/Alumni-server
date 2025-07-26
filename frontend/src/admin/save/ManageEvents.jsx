
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import { baseUrl } from '../../utils/globalurl';

const ManageEvents = () => {
    const [eventData, setEventData] = useState({
        id: '',
        title: "",
        schedule: "",
        content: "",

    });
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state && location.state.status === "edit") {
            const { id, title, schedule, content } = location.state.data;
            const formattedSchedule = schedule.replace('Z', '');
            setEventData(prevState => ({
                ...prevState,
                id,
                title,
                schedule: formattedSchedule,
                content
            }));
        }
    }, [location.state]);

    const handleChange = (content) => {
        setEventData(prevState => ({
            ...prevState,
            content
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(eventData);
        try {
            if (eventData.id != "") {

                // if (location.state && location.state.action === 'edit') {
                // Perform update operation
                await axios.put(`${baseUrl}/events/${eventData.id}`, eventData)
                    .then((res) => toast.success(res.data.message))
                // }
            } else {
                // Perform insert operation
                await axios.post(`${baseUrl}/events`, eventData)
                    .then((res) => toast.success(res.data.message))
            }
            setEventData({
                id: '',
                title: "",
                schedule: "",
                content: "",
            })
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred');
        }
    }


    const handleBack = () => {
        if (location.pathname.startsWith("/dashboard")) {
            navigate("/dashboard/events");
        }
    };


    return (
        <>
            <div className="container-fluid">
                <ToastContainer />
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form action="" id="manage-event">
                                <input type="hidden" name="id" value="id" />
                                <div className="form-group row">
                                    <div className="col-md-5">
                                        <label htmlFor="" className="control-label">Event</label>
                                        <input type="text" className="form-control" name="title" value={eventData.title} required onChange={(e) => setEventData({ ...eventData, title: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-5">
                                        <label htmlFor="" className="control-label">Schedule</label>
                                        <input type='datetime-local' className="form-control datetimepicker" name="schedule" value={eventData.schedule} required autoComplete="off" onChange={(e) => setEventData({ ...eventData, schedule: e.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-10">
                                        <label htmlFor="" className="control-label">Description</label>
                                        {/* <textarea name="content" id="content" className="form-control jqte" cols="30" rows="5" value={eventData.content} required onChange={(e) => setEventData({ ...eventData, content: e.target.value })}></textarea> */}
                                        <ReactQuill
                                            value={eventData.content}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* <div className=" row form-group">
                                    <div className="col-md-5">
                                        <label htmlFor="" className="control-label">Banner Image</label>
                                        <input type="file" className="form-control" name="banner" />
                                    </div>

                                    <div className="col-md-5">
                                        <img src="" alt="banner-img" id="banner-field" />
                                    </div>
                                </div> */}
                                <div className="">
                                    {/* <div className="col-md-12"> */}
                                    <button className="btn btn-primary mr-2" type='submit' onClick={handleSubmit}> Save</button>
                                    <button className="btn btn-danger " onClick={handleBack}>Cancel</button>

                                    {/* </div> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="imgF" style={{ display: 'none' }} id="img-clone">
                <span className="rem badge badge-primary" ><FaTimes /></span>

            </div> */}
        </>
    )
}

export default ManageEvents