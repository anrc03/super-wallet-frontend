import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const PageNotFound = () => {

  const navigate = useNavigate()

  return (
    <div className="d-flex justify-content-center align-items-center error-404" style={{ width: '100%', height: '100vh' }}>
      <div className="justify-content-center align-items-center">
        <div className="justify-content-center align-items-center d-flex">
          <img src="./../src/assets/images/404.png" alt="Error 404 Picture" />
        </div>
        <div className="justify-content-center align-items-center d-flex" style={{ marginTop: '-40px', marginBottom: '20px' }}>
          <h3>Oops ... Did you type the wrong address?</h3>
        </div>
        <div className="justify-content-center align-items-center d-flex">
          <Button className='btn-green' style={{ fontSize: '20px' }} onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound