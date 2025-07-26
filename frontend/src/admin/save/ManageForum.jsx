import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import { baseUrl } from '../../utils/globalurl'

const ManageForum = ({ setHandleAdd }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isEdit = location.state?.status === 'edit'

  const [formData, setFormData] = useState({ id: '', title: '', description: '' })
  const [submitting, setSubmitting] = useState(false)

  // populate when editing
  useEffect(() => {
    if (isEdit) {
      setFormData(location.state.data)
    }
  }, [isEdit, location.state])

  const handleBack = useCallback(() => {
    if (location.pathname.startsWith('/dashboard')) {
      navigate('/dashboard/forum')
    } else {
      setHandleAdd(false)
    }
  }, [location.pathname, navigate, setHandleAdd])

  const callApi = (url, method, data) =>
    axios({ url: baseUrl + url, method, data, withCredentials: true })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    setSubmitting(true)
    try {
      const user_id = localStorage.getItem('user_id')
      const payload = {
        title: formData.title,
        description: formData.description,
        user_id,
      }

      if (isEdit) {
        await callApi(`/forums/${formData.id}`, 'put', payload)
        toast.success('Forum updated')
      } else {
        await callApi('/forums', 'post', payload)
        toast.success('Forum created')
      }

      setFormData({ id: '', title: '', description: '' })
      handleBack()
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <form onSubmit={handleSubmit}>
        {isEdit && (
          <input
            type="hidden"
            value={formData.id}
          />
        )}

        <div className="form-group row">
          <label className="col-md-2 col-form-label">Title</label>
          <div className="col-md-8">
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              disabled={submitting}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-md-2 col-form-label">Description</label>
          <div className="col-md-8">
            <ReactQuill
              value={formData.description}
              onChange={desc => setFormData(f => ({ ...f, description: desc }))}
              readOnly={submitting}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-10 text-right">
            <button
              type="submit"
              className="btn btn-primary mr-2"
              disabled={submitting || !formData.title.trim()}
            >
              {submitting ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleBack}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ManageForum
