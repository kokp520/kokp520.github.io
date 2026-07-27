import React, { useRef, useEffect } from 'react';
import { GameContent, GameVideo } from '../styles/styledComponents';

const OpeningVideo = ({ onVideoEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <GameContent>
      <GameVideo 
        ref={videoRef}
        onEnded={onVideoEnd}
        autoPlay
        muted={false}
        controls={false}
      >
        <source src="/assets/gameboy-opening.mp4" type="video/mp4" />
        您的瀏覽器不支援影片播放
      </GameVideo>
    </GameContent>
  );
};

export default OpeningVideo;