import { useState } from 'react'
import './App.css'
import { CourseContextProvider } from './context/CourseContext'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes'

function App() {

  return (
    <CourseContextProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes/>
      </BrowserRouter>
    </CourseContextProvider>
  )
}

export default App
