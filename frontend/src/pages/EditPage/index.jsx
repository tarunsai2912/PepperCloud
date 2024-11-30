import React, {useState, useEffect} from 'react'
import deleteImg from '../../assets/delete.png'
import editImg from '../../assets/edit.png'
import './index.css'
import ClipLoader from "react-spinners/ClipLoader"
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
const url = 'http://localhost:3003/api/form'

function EditPage() {

  const {id} = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)
  const [add, setAdd] = useState(false)
  const inputHead = ['text', 'number', 'email', 'password', 'date']
  const [addTitle, setAddTitle] = useState(false)
  const [addInput, setAddInput] = useState(false)
  const [selectIndex, setSelectIndex] = useState('')

  const handleGetForm = async () => {
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
    handleGetForm()
  }, [])

  const handleTitle = () => {
    setAddTitle(true)
    setAddInput(false)
  }

  const handleAddInput = (field) => {
    if(form.inputs.length < 20){
      setForm({
        ...form,
        inputs: [...form.inputs, {type: field, label: '', placeholder: ''}]
      })
    }
    else{
      alert('Maximum 20 inputs allowed.')
    }
  }

  const handleChangeInput = (index, field, value) => {
    const updatedInputs = [...form.inputs]
    updatedInputs[index][field] = value
    setForm({
      ...form,
      inputs: updatedInputs
    })
  }

  const handleEdit = (index) => {
    setSelectIndex(index)
    setAddTitle(false)
    setAddInput(true) 
  }

  const handleDelete = (index) => {
    const updatedInputs = form.inputs.filter((each, eachIndex) => {
      return (
        eachIndex !== index 
      )
    })
    setForm({
      ...form,
      inputs: updatedInputs
    })
  }

  const handleChangeTitle = (value) => {
    setForm({
      ...form,
      title: value
    })
  }

  const handleSubmit = async () => {
    const hasEmptyField = form.inputs.some(check => !check.label)

    if (!form.title || hasEmptyField) {
      alert("Please give title and input title!")
      return
    }
    try{
      const reqUrl = `${url}/update/${id}`
      const response = await axios.put(reqUrl, form)
      if(response){
        navigate('/')
      }
    }
    catch (error) {
      alert('Wrong occurred') 
      console.log(error)
    }
  }

  return (
    <>
      {loading && <ClipLoader color="#000" />}
      {!loading && <div className='edit'>
        <h3 className='edit-head'>Edit Form</h3>
        <div className='edit-div'>
          <div className='edit-in-div1'>
            <div className='edit-head-div'>
              <input className='edit-head1' type='text' name='title' placeholder='Untitled Form' value={form.title} readOnly></input>
              <img className='edit-edit1' src={editImg} alt='edit_img' width='20px' height='20px' onClick={handleTitle}></img>
            </div>
            <div className='edit-inp-div'>
            {form.inputs.length > 0 && form.inputs.map((input, inputIndex) => {
              return (
                <div className='edit-eachinp-div' key={inputIndex}>
                  <input className='edit-inp-para' type={input.type} name='label' value={input.label} readOnly></input>
                  <img className='edit-edit2' src={editImg} alt='edit_img' width='20px' height='20px' onClick={() => handleEdit(inputIndex)}></img>
                  <img className='edit-del1' src={deleteImg} alt='del_img' width='20px' height='20px' onClick={() => handleDelete(inputIndex)}></img>
                </div>
              )
            })}
            </div>
            {!add ? <button className='edit-add-btn' onClick={() => setAdd(true)}>ADD INPUT</button> : <button className='edit-add-btn' onClick={() => setAdd(false)}>CLOSE ADD INPUT</button>}
            {add && <div className='edit-inptype-div'>
              {inputHead.map((each, eachIndex) => {
                return (<button className='edit-inptype-btn' key={eachIndex} onClick={() => handleAddInput(each)}>{each}</button>)
              })}
            </div>}
            <button className='edit-sub-btn' onClick={handleSubmit}>SUBMIT</button>
          </div>
          <div className='edit-line'></div>
          <div className='edit-in-div2'>
            <h5 className='edit-head2'>Form Editor</h5>
            {!addTitle && !addInput && <h5 className='edit-head3'>Select to see editor</h5>}
            {addTitle && !addInput && <div className='edit-tit-div'>
              <h5 className='edit-tit-head'>Title</h5>
              <input className='edit-tit-inp' type='text' name='title' value={form.title} placeholder='Title' onChange={(e) => handleChangeTitle(e.target.value)}></input>
            </div>}
            {!addTitle && addInput && form.inputs.map((input, inputIndex) => {
              return (inputIndex == selectIndex && <div className='edit-inpwrite-div' key={inputIndex}>
                <h2 className='edit-inpwrite-type'>{input.type}</h2>
                <h5 className='edit-label-head'>Title</h5>
                <input className='edit-label-inp' type={input.type} name='label' value={input.label} placeholder='Title' onChange={(e) => handleChangeInput(inputIndex, 'label', e.target.value)}></input>
                <h5 className='edit-place-head'>Placeholder</h5>
                <input className='edit-place-inp' type='text' name='placeholder' value={input.placeholder} placeholder='Placeholder' onChange={(e) => handleChangeInput(inputIndex, 'placeholder', e.target.value)}></input>
              </div>)
            })}
          </div>
        </div>
        <button className='edit-btn' onClick={handleSubmit}>SAVE FORM</button>
      </div>}
    </>
  )
}

export default EditPage
