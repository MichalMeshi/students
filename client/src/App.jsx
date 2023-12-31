import { useState } from 'react'
import './App.css'
import { CourseContextProvider } from './context/CourseContext'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './components/AppRoutes'
import CourseDatialPage from './pages/CourseDatialPage';
import { ProfileContextProvider } from './context/ProfileContext';
<<<<<<< HEAD
import SummaryContext, { SummaryContextProvider } from './context/SummaryContext';
=======
import { ForumContextProvider } from './context/ForumContext';
>>>>>>> a0a6a200a06b18b7ee80d7d997ef0bb2e643e7aa

function App() {

  return (
<<<<<<< HEAD
    <ProfileContextProvider>
      <CourseContextProvider>
        <SummaryContextProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
        </SummaryContextProvider>
      </CourseContextProvider>
    </ProfileContextProvider>
=======
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
>>>>>>> a0a6a200a06b18b7ee80d7d997ef0bb2e643e7aa
  )
}

export default App
