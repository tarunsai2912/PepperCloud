import React, {useState} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import deleteImg from '../../assets/delete.png'
import axios from 'axios'
import editImg from '../../assets/edit.png'
import './index.css'
import {useNavigate} from 'react-router-dom'
const url = 'http://localhost:3003/api/form'

function CreatePage() {

  const navigate = useNavigate()
  const [add, setAdd] = useState(false)
  const inputHead = ['text', 'number', 'email', 'password', 'date']
  const [addTitle, setAddTitle] = useState(false)
  const [addInput, setAddInput] = useState(false)
  const [selectIndex, setSelectIndex] = useState('')

  const [form, setForm] = useState({
    title: '',
    inputs: []
  })

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
      const reqUrl = `${url}/create`
      const response = await axios.post(reqUrl, form)
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
    <div className='create'>
      <h3 className='create-head'>Create New Form</h3>
      <div className='create-div'>
        <div className='create-in-div1'>
          <div className='create-head-div'>
            <input className='create-head1' type='text' name='title' placeholder='Untitled Form' value={form.title} readOnly></input>
            <img className='create-edit1' src={editImg} alt='edit_img' width='15px' height='15px' onClick={handleTitle}></img>
          </div>
          <div className='create-inp-div'>
          {form.inputs.length > 0 && form.inputs.map((input, inputIndex) => {
            return (
              <div className='create-eachinp-div' key={inputIndex}>
                <input className='create-inp-para' type={input.type} name='label' value={input.label} placeholder='Title' readOnly></input>
                <img className='create-edit2' src={editImg} alt='edit_img' width='15px' height='15px' onClick={() => handleEdit(inputIndex)}></img>
                <img className='create-del1' src={deleteImg} alt='del_img' width='20px' height='20px' onClick={() => handleDelete(inputIndex)}></img>
              </div>
            )
          })}
          </div>
          {!add ? <button className='create-add-btn' onClick={() => setAdd(true)}>ADD INPUT</button> : <button className='create-add-btn' onClick={() => setAdd(false)}>CLOSE ADD INPUT</button>}
          {add && <div className='create-inptype-div'>
            {inputHead.map((each, eachIndex) => {
              return (<button className='create-inptype-btn' key={eachIndex} onClick={() => handleAddInput(each)}>{each}</button>)
            })}
          </div>}
          <button className='create-sub-btn' onClick={handleSubmit}>SUBMIT</button>
        </div>
        <div className='create-line'></div>
        <div className='create-in-div2'>
          <h5 className='create-head2'>Form Editor</h5>
          {!addTitle && !addInput && <h5 className='create-head3'>Select to see editor</h5>}
          {addTitle && !addInput && <div className='create-tit-div'>
            <h5 className='create-tit-head'>Title</h5>
            <input className='create-tit-inp' type='text' name='title' value={form.title} placeholder='Title' onChange={(e) => handleChangeTitle(e.target.value)}></input>
          </div>}
          {!addTitle && addInput && form.inputs.map((input, inputIndex) => {
            return (inputIndex == selectIndex && <div className='create-inpwrite-div' key={inputIndex}>
              <h2 className='create-inpwrite-type'>{input.type}</h2>
              <h5 className='create-label-head'>Title</h5>
              <input className='create-label-inp' type={input.type} name='label' value={input.label} placeholder='Title' onChange={(e) => handleChangeInput(inputIndex, 'label', e.target.value)}></input>
              <h5 className='create-place-head'>Placeholder</h5>
              <input className='create-place-inp' type='text' name='placeholder' value={input.placeholder} placeholder='Placeholder' onChange={(e) => handleChangeInput(inputIndex, 'placeholder', e.target.value)}></input>
            </div>)
          })}
        </div>
      </div>
      <button className='create-btn' onClick={handleSubmit}>CREATE FORM</button>
    </div>
  )
}

export default CreatePage
