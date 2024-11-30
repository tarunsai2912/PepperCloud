import React from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import ViewPage from './pages/ViewPage'
import ErrorPage from './pages/ErrorPage'
import EditPage from './pages/EditPage'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/form/create' element={<CreatePage />}></Route>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/form/:id' element={<ViewPage />}></Route>
        <Route path='/form/:id/edit' element={<EditPage />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
