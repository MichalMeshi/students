import React from 'react'
import { Button } from 'react-bootstrap';
import '../stylesheets/bluebutton.css'

const NoPage = () => {
  return (
    <div className =''style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: 'blue' }}>404 Not Found</h1>
      <p>This page doesn't exist.</p>
      <div>
      <img src='https://cdn.pixabay.com/animation/2022/12/05/15/23/15-23-06-837_512.gif' width={200}/>

      </div>
      <Button id = 'loginbtn'>Home</Button>
    </div>
  )
}

export default NoPage
