import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import './DisplayMessage.css'; // Import the CSS file

function DisplayMessage({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Hide the component after 2 seconds

    return () => {
      clearTimeout(timeout); // Clear the timeout if the component unmounts
    };
  }, []);

  return isVisible ?
    <div className="full-page-overlay">
      <div className="centered-container">
        <Alert className='p-5' variant='success'>
        <div class="fa-3x">
          <i className="fa-solid fa-check fa-beat"></i>
        </div>
          {message}
        </Alert>
      </div>
    </div>
  : null;
}

export default DisplayMessage;
