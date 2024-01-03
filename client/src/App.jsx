import { useState } from 'react'
import './App.css'
import { CourseContextProvider } from './context/CourseContext'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './components/AppRoutes'
import CourseDatialPage from './pages/CourseDatialPage';
import { ProfileContextProvider } from './context/ProfileContext';
import { ForumContextProvider } from './context/ForumContext';
import SummaryContext, { SummaryContextProvider } from './context/SummaryContext';
import EntrancePage from './pages/EntrancePage';

function App() {

  return (
    <ForumContextProvider>
      <SummaryContextProvider>
        <ProfileContextProvider>
          <CourseContextProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </CourseContextProvider>
        </ProfileContextProvider>
      </SummaryContextProvider>

    </ForumContextProvider>
  )
}

export default App
