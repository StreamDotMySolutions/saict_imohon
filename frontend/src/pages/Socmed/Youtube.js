import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const YouTube = () => {
  const videoId = 'FnkRfDROw_4'; // Replace with your YouTube video ID

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('player', {
        videoId: videoId,
        width: 534,
        height: 300,
        playerVars: {
          autoplay: 0, // Set to 1 to autoplay the video
        },
      });
    };
  }, [videoId]);

  return (
    <div className="embed-responsive embed-responsive-16by9">
      <div className="card-header bg-danger text-white">
        <FontAwesomeIcon icon={faYoutube} /> Youtube
      </div>
      <div id="player" className="embed-responsive-item"></div>
    </div>
  );
};

export default YouTube;
