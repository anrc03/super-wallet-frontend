import React, { useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";

export default function LoadSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{  width: '100%', height: '100vh' }}>
      <PuffLoader
        color='#3a5a40'
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
