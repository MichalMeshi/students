import React from 'react'
import { Button } from 'react-bootstrap'
import '../stylesheets/bluebutton.css'
export default function BlueButton() {
  return (
    <div>
         <Button id='loginbtn' type="submit" className="w-25">
                            Sign In
                        </Button>
    </div>
  )
}
