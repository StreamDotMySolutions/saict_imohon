import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Facebook = () => {
  const facebookPageURL = 'https://www.facebook.com/BeritaRTM?mibextid=LQQJ4d';

  return (
    <div className="card mt-3">
      <div className="card-header bg-primary text-white">
        <FontAwesomeIcon icon={faFacebook} /> Facebook
      </div>
      <div className="card-body">

        <div className="container text-center my-0 ratio ratio-16x9">
          <iframe 
            src={`https://www.facebook.com/plugins/page.php?href=${facebookPageURL}&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
            allowFullScreen></iframe>
        </div>
      
      </div>
    </div>
  );
};

export default Facebook;
