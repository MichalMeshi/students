import { useState } from 'react'
import './App.css'
import { CourseContextProvider } from './context/CourseContext'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './components/AppRoutes'
import CourseDatialPage from './pages/CourseDatialPage';
import { ProfileContextProvider } from './context/ProfileContext';
import SummaryContext, { SummaryContextProvider } from './context/SummaryContext';

function App() {

  return (
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
  )
}

export default App
