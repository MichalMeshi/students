import { useState } from 'react'
import './App.css'
import { CourseContextProvider } from './context/CourseContext'
import { BrowserRouter, HashRouter ,Route, Routes } from 'react-router-dom';
import AppRoutes from './components/AppRoutes'
import CourseDatialPage from './pages/CourseDatialPage';
import { ProfileContextProvider } from './context/ProfileContext';
import { ForumContextProvider } from './context/ForumContext';
import SummaryContext, { SummaryContextProvider } from './context/SummaryContext';
import EntrancePage from './pages/EntrancePage';
import ChatbotComponent from './components/ChatbotComponent';

function App() {

  return (
    <ForumContextProvider>
      <SummaryContextProvider>
        <ProfileContextProvider>
          <CourseContextProvider>
            <HashRouter>
              <ChatbotComponent />
              <AppRoutes />
            </HashRouter>
          </CourseContextProvider>
        </ProfileContextProvider>
      </SummaryContextProvider>

    </ForumContextProvider>
  )
}

export default App
