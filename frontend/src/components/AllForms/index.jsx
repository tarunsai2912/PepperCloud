import React,{useState, useEffect} from 'react'
import './index.css'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"
import { useNavigate } from 'react-router-dom'
const url = 'http://localhost:3003/api/form'

function AllForms() {

  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleForms = async () => {
    try{
      setLoading(true)
      const reqUrl = `${url}/all`
      const response = await axios.get(reqUrl)
      if(response){
        setForms(response.data.forms)
        setLoading(false)
      }
    }
    catch(error){
      setLoading(false)
    }
  }

  useEffect(() => {
    handleForms()
  }, [])

  const handleDelete = async (id) => {
    try{
      const reqUrl = `${url}/delete/${id}`
      const response = await axios.delete(reqUrl)
      if(response){
        window.location.reload(false)
      }
    }
    catch(error){
      alert('Sorry cannot be deleted')
    }
  }

  return (
    <>
      <h3 className='all-head1'>Forms</h3>
      {loading && <ClipLoader color="#000" />}
      {!loading && <div className='all-div'>
        {forms.length == 0 && <h5 className='all-head2'>You have no forms created yet</h5>}
        {forms.length > 0 && forms.map((each, eachIndex) => {
          return(<div className='all-each' key={eachIndex}>
            <h3 className='all-each-head'>{each.title}</h3>
            <div className='all-btn-div'>
              <h5 className='all-view' onClick={() => navigate(`/form/${each._id}`)}>VIEW</h5>
              <h5 className='all-edit' onClick={() => navigate(`/form/${each._id}/edit`)}>EDIT</h5>
              <h5 className='all-del' onClick={() => handleDelete(each._id)}>DELETE</h5>
            </div>
          </div>)
        })}
      </div>}
    </>
  )
}

export default AllForms
