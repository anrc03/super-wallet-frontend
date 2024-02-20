import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const PageNotFound = () => {

  const navigate = useNavigate()

  return (
    <div className="d-flex justify-content-center align-items-center empty" style={{  width: '50%', height: '50%' }}>
        <div className="d-flex justify-content-center align-items-center">
            <img src="./../src/assets/images/Empty.png" alt="Empty Picture" />
            <h1>Oops... Did you type the wrong address? <span><Button variant='success' onClick={() => navigate(-1)}><p style={{fontSize:15}}>Go Back</p></Button></span></h1>
        </div>
    </div>
  )
}

export default PageNotFound