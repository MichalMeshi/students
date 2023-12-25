import { useState } from 'react'
import './App.css'
import { CourseContextProvider } from './context/CourseContext'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './components/AppRoutes'
import CourseDatialPage from './pages/CourseDatialPage';
import { ProfileContextProvider } from './context/ProfileContext';

function App() {

  return (
    <ProfileContextProvider>
      <CourseContextProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </CourseContextProvider>
    </ProfileContextProvider>
  )
}

export default App
