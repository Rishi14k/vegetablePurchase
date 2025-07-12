import React from 'react'
import './output.css'
import {Toaster} from 'react-hot-toast'
import MainDataEntry from './components/MainDataEntry'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import GroceryDataEntry from './components/GroceryDataEntry'

const App = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/vegetable-entry' element={<MainDataEntry/>}/>
        <Route path='/grocery-entry' element={<GroceryDataEntry/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App