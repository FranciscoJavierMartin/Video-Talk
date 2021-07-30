import React, { useEffect, useRef } from 'react';

const styles = {
  videoContainer: {
    width: '100%',
    height: '100%',
  },
  videoElement: {
    width: '100%',
    height: '100%',
  },
};

const RemoteVideoView = ({ remoteStream }) => {
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (remoteStream) {
      const localVideo = remoteVideoRef.current;
      localVideo.srcObject = remoteStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [remoteStream]);

  return (
    <div style={styles.videoContainer} className='background_secondary_color'>
      <video style={styles.videoElement} ref={remoteVideoRef} autoPlay></video>
    </div>
  );
};

export default RemoteVideoView;
