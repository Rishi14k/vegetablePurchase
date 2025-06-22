import React from 'react'
import DataEntry from './components/DataEntry'
import './output.css'
import {Toaster} from 'react-hot-toast'
import MainDataEntry from './components/MainDataEntry'

const App = () => {
  return (
    <>
      
      <MainDataEntry/>
      <Toaster/>
    </>
  )
}

export default App