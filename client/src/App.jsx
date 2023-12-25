import { useState } from 'react'
import './App.css'
import { CourseContextProvider } from './context/CourseContext'
import Navbar from './components/Navbar'
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import AppRoutes from './components/AppRoutes'
import CourseDatialPage from './pages/CourseDatialPage';

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
