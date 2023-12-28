import { useState } from 'react'
import './App.css'
import { CourseContextProvider } from './context/CourseContext'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './components/AppRoutes'
import CourseDatialPage from './pages/CourseDatialPage';
import { ProfileContextProvider } from './context/ProfileContext';
import { ForumContextProvider } from './context/ForumContext';

function App() {

  return (
    <ForumContextProvider>
      <ProfileContextProvider>
        <CourseContextProvider>
          <BrowserRouter>
            <Navbar />
            <AppRoutes />
          </BrowserRouter>
        </CourseContextProvider>
      </ProfileContextProvider>
    </ForumContextProvider>
  )
}

export default App
