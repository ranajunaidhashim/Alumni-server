import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../utils/globalurl';




const AdminForum = () => {

  const [forum, setForum] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`${baseUrl}/forums`)
      .then((res) => {
        console.log(res.data)
        setForum(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const delForum = (id) => {
    axios.delete(`${baseUrl}/forums/${id}`)
      .then((res) => {
        // console.log(res.data.message)
        toast.info(res.data.message);
        setForum(forum.filter((e) => e.id !== id))
      })
      .catch((err) => console.log(err))
  }
  const handleView = (e) => {
    navigate("/forum/view", { state: { action: "view", data: e } });
  }


  const CutDesc = (content, maxLength) => {
    const strippedContent = content.replace(/<[^>]+>/g, '');
    if (strippedContent.length > maxLength) {
      return strippedContent.substring(0, maxLength) + '...';
    }
    return strippedContent;
  };


  return (
    <>
      <ToastContainer position="top-center" />

      <div className="container-fluid">
        <div className="col-lg-12">
          <div className="row mb-4 mt-4">
            <div className="col-md-12">

            </div>
          </div>
          <div className="row">

            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <b>Forum List ({forum.length})</b>
                  <span className="">
                    <button onClick={() => navigate("/dashboard/forum/manage")} className="btn btn-primary btn-block btn-sm col-sm-2 float-right" type="button" >
                      <FaPlus /> New</button>
                  </span>
                </div>
                <div className="card-body">
                  <div className="table-responsive">

                    <table className="table table-bordered table-condensed table-hover">
                      <colgroup>
                        <col width="5%" />
                        <col width="20%" />
                        <col width="30%" />
                        <col width="20%" />
                        <col width="10%" />
                        <col width="15%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th className="text-center">#</th>
                          <th className="">Topic</th>
                          <th className="">Description</th>
                          <th className="">Created By</th>
                          <th className="">Comments</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {forum.length > 0 ? <>
                          {forum.map((e, index) => (
                            <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              <td className="">
                                <p><b> {e.title}</b></p>
                              </td>
                              <td className="">
                                <p className="truncate"><b>{CutDesc(e.description, 50)}</b></p>

                              </td>
                              <td className="text-center">
                                <p><b>{e.created_by}</b></p>
                              </td>
                              <td className="text-center">
                                <p><b>{e.comments_count}</b></p>
                              </td>
                              <td className="text-center justify-content-center border-0 d-flex gap-1">
                                <button onClick={() => handleView(e)} className="btn btn-sm btn-outline-primary edit_career" >View</button>
                                <Link to="/dashboard/forum/manage" state={{ status: "edit", data: e }} className="btn btn-sm btn-outline-primary" type="button">Edit</Link>
                                <button onClick={() => delForum(e.id)} className="btn btn-sm btn-outline-danger " type="button">Delete</button>
                              </td>
                            </tr>))}</> : <>
                          <tr>
                            <td colSpan={6} className="text-center">No Forum Available</td>
                          </tr>
                        </>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AdminForum