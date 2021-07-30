import React from 'react';
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideoLabel,
  MdVideoCall,
  MdCamera,
  MdPermDeviceInformation,
  MdVideocamOff,
} from 'react-icons/md';
import {
  hangUp,
  switchForScreenSharingStream,
} from '../../../utils/webRTC/webRTCHandler';
import ConversationButton from './ConversationButton';

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '22%',
    left: '35%',
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e6e5e8',
  },
};

const ConversationButtons = ({
  localStream,
  localCameraEnabled,
  localMicrophoneEnabled,
  setCameraEnabled,
  setMicrophoneEnabled,
  screenSharingActive,
  groupCall
}) => {
  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? (
          <MdMic style={styles.icon} />
        ) : (
          <MdMicOff style={styles.icon} />
        )}
      </ConversationButton>
      {!groupCall && <ConversationButton onClickHandler={handleHangUpButtonPressed}>
        <MdCallEnd style={styles.icon} />
      </ConversationButton>}
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? (
          <MdVideocam style={styles.icon} />
        ) : (
          <MdVideocamOff style={styles.icon} />
        )}
      </ConversationButton>
      {!groupCall && <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ? (
          <MdCamera style={styles.icon} />
        ) : (
          <MdVideoLabel style={styles.icon} />
        )}
      </ConversationButton>}
    </div>
  );
};

export default ConversationButtons;
