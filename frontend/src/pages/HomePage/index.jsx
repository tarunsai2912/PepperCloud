import React from 'react'
import './index.css'
import AllForms from '../../components/AllForms'
import {useNavigate} from 'react-router-dom'

function HomePage() {

  const navigate = useNavigate()

  return (
    <div className='home'>
      <div className='home-div1'>
        <h1 className='home-head1'>Welcome to Form.com</h1>
        <h5 className='home-head2'>This is a sample form builder</h5>
        <button className='home-btn' onClick={() => navigate('/form/create')}>CREATE NEW FORM</button>
        <div className='home-line'></div>
      </div>
      <div className='home-div2'>
        <AllForms />
      </div>
    </div>
  )
}

export default HomePage
