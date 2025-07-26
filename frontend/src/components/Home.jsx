import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { FiBook, FiUsers, FiClipboard, FiTool } from 'react-icons/fi';
import { FaCalendar, FaTimes } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import imgcs from "../assets/uploads/imgcs.jpg";
import { baseUrl } from '../utils/globalurl';
// import head_cover from "../assets/uploads/head_cover.jpg";
// import img3 from "../assets/uploads/gallery/img3.jpg"

const Home = () => {
    const { theme } = useTheme();
    const { isLoggedIn, isAdmin } = useAuth();;
    const [events, setEvents] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            const user_name = localStorage.getItem("user_name");
            if (location.state && location.state.action === 'homelogin') {
                // console.log("location my::",location);
                toast.success(`Welcome ${user_name}`);
            }
        }
        if (location.state && location.state.action === 'homelogout') {
            // console.log("location my::",location);
            toast.info("Logout Success");
        }
        return () => {
            location
        }

    }, [location.state]);

    useEffect(() => {
        axios.get(`${baseUrl}/events/upcoming-events`)
            .then((res) => {
                console.log("HELLO",res.data);
                setEvents(res.data);
            })
            .catch((err) => console.log(err));
    }, []);




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

    return (
        <div>
            <ToastContainer hideProgressBar="true" position="top-center" pauseOnHover="false" pauseOnFocusLoss="false" />
            <header className="masthead" style={{ backgroundImage: `url(${imgcs})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100vh" }}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center justify-content-center">
                        <div className="col-lg-8  text-center">
                            <h1 className="text-white font-weight-bold display-3 mb-4">Welcome to BZU CS ALUMNI</h1>
                            <p className="text-white-75 font-weight-light lead mb-5">Connecting Computer Science Alumni Across The Globe</p>
                            {!isAdmin && <Link className="btn btn-primary btn-xl" to="about">Find Out More</Link>}
                            {!isLoggedIn && <Link className="btn btn-info  ms-2   btn-xl" to="login">Login</Link>}
                            {isLoggedIn && isAdmin && <Link className="btn btn-primary btn-xl" to="dashboard">Admin Dashboard</Link>}
                            {isLoggedIn && !isAdmin && <Link className="btn btn-info  ms-2   btn-xl" to="account">Profile</Link>}
                        </div>
                    </div>
                </div>
            </header>


            <section className={`page-section bg-${theme}`} id="alumni-benefits">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Alumni Benefits</h2>
                        <h3 className=" card-title text-muted">As a member of the global BZU alumni network, you have access to a variety of exclusive services and benefits.</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 mb-4">
                            <div className="card h-100 benefit-card">
                                <div className="card-body text-center">
                                    <FiClipboard size={40} className="mb-3 text-primary" />
                                    <h4 className="card-title">Career Support</h4>
                                    <p className="card-text">Get assistance with your career goals.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4">
                            <div className="card h-100 benefit-card">
                                <div className="card-body text-center">
                                    <FiBook size={40} className="mb-3 text-primary" />
                                    <h4 className="card-title">Library</h4>
                                    <p className="card-text">Access to the alumni library.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4">
                            <div className="card h-100 benefit-card">
                                <div className="card-body text-center">
                                    <FiTool size={40} className="mb-3 text-primary" />
                                    <h4 className="card-title">Sports Facilities</h4>
                                    <p className="card-text">Access to sports facilities.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4">
                            <div className="card h-100 benefit-card">
                                <div className="card-body text-center">
                                    <FiUsers size={40} className="mb-3 text-primary  " />
                                    <h4 className="card-title">Alumni Directory</h4>
                                    <p className="card-text">Connect with fellow alumni.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`py-4 bg-${theme}`} id="upcoming-events">
                <div className="container">
                    <h2 className="section-heading text-center">Upcoming Events</h2>
                    <hr className="divider my-4" />
                    {events?.length > 0 ? <>
                        {events.map((e, index) => (
                            <div className="card event-list" key={index} >
                                <div className='banner'>
                                    <img src="" alt="" />
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center justify-content-center text-center h-100">
                                        <div className="">
                                            <h3><b className="filter-txt">{e.title}</b></h3>
                                            <div><small><p><b><FaCalendar className='me-1 ' />{formatDate(e.schedule)}</b></p></small></div>
                                            <hr />
                                            <p className="truncate filter-txt" dangerouslySetInnerHTML={{ __html: e.content }}></p>
                                            <br />
                                            <hr className="divider" style={{ maxWidth: "calc(80%)" }} />
                                            <button className="btn btn-primary float-right read_more" onClick={() => navigate("events/view", { state: { action: "view", data: e } })}>Read More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>))}</> : <>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h4 className='text-info-emphasis'>No Upcoming Event Available</h4>
                        </div>
                    </>}
                </div>
            </section>
            {/* <section className="page-section" id="about">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">About Us</h2>
                        <h3 className="section-subheading text-muted">Learn more about our community</h3>
                    </div>
                </div>
            </section>
            <section className="page-section bg-light" id="faculties">
                <div className="container">
                    <h2 className="section-heading text-center">Our Efficient Faculties</h2>
                    <hr className="divider my-4" />
                    Placeholders for faculties content
                </div>
            </section>
            <section className="page-section" id="forums">
                <div className="container">
                    <h2 className="section-heading text-center">Forums</h2>
                    <hr className="divider my-4" />
                    Placeholders for forums content
                </div>
            </section> */}
        </div>
    )
}

export default Home;
