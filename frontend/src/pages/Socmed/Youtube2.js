import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const YouTube2 = () => {
  const videoId = 'Mkyr0ZxtDgA'; // Replace with your YouTube video ID

  return (
    <div className="embed-responsive embed-responsive-16by9 mt-3">
      <div className="card-header bg-danger text-white">
        <FontAwesomeIcon icon={faYoutube} /> Youtube
      </div>
     
      <div className="container text-center my-0 ratio ratio-16x9">
        <iframe src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default YouTube2;
