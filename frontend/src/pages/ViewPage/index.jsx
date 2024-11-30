import React, {useState, useEffect} from 'react'
import './index.css'
import ClipLoader from "react-spinners/ClipLoader"
import axios from 'axios'
import homeImg from '../../assets/home.png'
import { useParams, useNavigate } from 'react-router-dom'
const url = 'https://pepper-cloud-backend-one.vercel.app/api/form'

function ViewPage() {

  const {id} = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)

  const handleForm = async () => {
    try{
      const reqUrl = `${url}/each/${id}`
      const response = await axios.get(reqUrl)
      if(response){
        setForm(response.data)
        setLoading(false)
      }
    }
    catch(error){
      setLoading(false)
      alert('cannot get the form details')
    }
  }

  useEffect(() => {
    handleForm()
  }, [])

  return (
    <div className='view'>
      <div className='view-home' onClick={() => navigate('/')}>
        <img className='view-home-img' src={homeImg} width='15px' height='15px' alt='home_img'></img>
        <h5 className='view-home-para'>Home</h5>
      </div>
      {loading && <ClipLoader color="#000" />}
      {!loading && form && <div className='view-div'>
        <h2 className='view-head'>{form.title}</h2>
        <div className='view-in-div'>
          {form.inputs.map((input, inputIndex) => {
            return(
              <div className='view-each-div' key={inputIndex}>
                {input.label}
              </div>
            )
          })}
        </div>
        <button className='view-btn' onClick={() => navigate('/')}>SUBMIT</button>
      </div>}
    </div>
  )
}

export default ViewPage
