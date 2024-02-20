import React from 'react'
import PuffLoader from "react-spinners/PuffLoader";

const SmallLoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{  width: '100%', height: '50vh' }}>
      <PuffLoader
        color='#3a5a40'
        size={75}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default SmallLoadingSpinner