import React, { useEffect, useState } from 'react'
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch,FaGlobe } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/uploads/logo.png";
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { authUrl } from '../utils/globalurl';

const Header = ({ toggleSidebar }) => {
    const { logout, isLoggedIn, isAdmin } = useAuth();
    const [name, setName] = useState();
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post(`${authUrl}/logout`)
            .then((res) => {
                navigate("/", { state: { action: "homelogout" } })
                localStorage.clear();
                logout();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const user_name = localStorage.getItem("user_name");
        setName(user_name);
    }, []);

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <FaBars className="bi bi-list toggle-sidebar-btn d-lg-none" onClick={toggleSidebar} />
                    <img className='dlimg' src={logo} alt="" />
                <div className="logo d-flex align-items-center">
                    <span className="d-none d-lg-block">Dashboard</span>
                </div>
            </div>

            {/* <div className="search-bar">
                <div className="search-form" >
                    <input type="search" placeholder="Search" />
                </div>
            </div> */}
            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    {/* <li className="nav-item d-block d-lg-none">
                        <a className="nav-link nav-icon search-bar-toggle " href="#">
                            <FaSearch />
                        </a>
                    </li> */}

                    <li className="nav-item dropdown pe-3">

                        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                            {/* <img src={logo} alt="Profile" className=" d-block d-md-none rounded-circle" style={{width: '30px', height: '30px'}} /> */}
                            <BsThreeDotsVertical className='d-block d-md-none' />
                            <span className="d-none d-md-block dropdown-toggle ps-2">{name}</span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{name}</h6>
                                {/* <span>Web Designer</span> */}
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            {/* <li>
                                <Link className="dropdown-item d-flex align-items-center" to="/dashboard/users">
                                    <CgProfile />
                                    <span className=' ms-1'>My Profile</span>
                                </Link>
                            </li> */}
                            <li>
                                <Link className="dropdown-item d-flex align-items-center" to="/">
                                    <FaGlobe />
                                    <span className=' ms-1'>WebPage</span>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <button className="dropdown-item d-flex align-items-center" >
                                    <IoMdLogOut />
                                    <span className=' ms-1' onClick={handleLogout} >Sign Out</span>
                                </button>
                            </li>

                        </ul>
                    </li>

                </ul>
            </nav>

        </header>
    )
}

export default Header