import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CourseCard from './components/CourseCard'
import { CourseContextProvider } from './context/CourseContext'
import CourseCardList from './components/CourseCardList'
function App() {
  const [count, setCount] = useState(0)

  return (
    <CourseContextProvider>
    
    
     <CourseCardList/>
    
    </CourseContextProvider>
  )
}

export default App
