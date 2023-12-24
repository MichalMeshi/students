import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CourseCard from './components/CourseCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CourseCard/>
    </>
  )
}

export default App
