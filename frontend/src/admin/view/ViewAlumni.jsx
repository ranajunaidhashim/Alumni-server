import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../../utils/globalurl';
// import { baseUrl } from '../../utils/globalurl';


const ViewAlumni = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [alumni, setAlumni] = useState([]);
    const [accStatus, setAccStatus] = useState();

    useEffect(() => {
        if (location.state && location.state.status === 'view') {
            setAlumni(location.state.data);
            setAccStatus(location.state.data.status);

            // console.log(location.state.data.status);
        }
    }, [location.state]);

    // const baseurl= baseUrl;
    // console.log(baseurl,"url");

    const handleStatus = (num) => {
        console.log(num);
        axios.put(`${baseUrl}/alumni/status`, { status: num, id: alumni.id })
            .then((res) => {
                setAccStatus(num);
                if (num == 1) {
                    toast.success("Account Verified");
                } else {
                    toast.success("Account Unverified");
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <ToastContainer position="top-center" />
            <div className="container-field">
                <div className="col-lg-12">
                    <div>
                        <center>
                            <div className="avatar">
                                <img src={`${baseUrl}/${alumni.avatar}`} className="vaimg" alt="avatar" />
                            </div>
                        </center>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-6">
                            <p>Name: <b>{alumni.name}</b></p>
                            <p>Email: <b> {alumni.email} </b></p>
                            <p>Batch: <b> {alumni.batch} </b></p>
                            <p>Course: <b>{alumni.course} </b></p>
                        </div>
                        <div className="col-md-6">
                            <p>Gender: <b> {alumni.gender} </b></p>
                            <p>Connected To: <b> {alumni.connected_to} </b></p>
                            <p>Account Status: <b> {accStatus == 1 ? <span className="badge badge-primary">Verified</span> : <span className="badge badge-secondary">Unverified</span>}</b></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer display">
                <div className="row">
                    <div className="col-lg-12">
                        <button onClick={()=>navigate('/dashboard/alumnilist')} className="btn float-right btn-secondary" type="button" >Back</button>
                        {accStatus == 1 ?
                            <button onClick={() => handleStatus(0)} className="btn float-right btn-primary update mr-2" type="button">Unverify Account</button> :
                            <button onClick={() => handleStatus(1)} className="btn float-right btn-primary update mr-2" type="button" >Verify Account</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewAlumni