import React from 'react';
import { connect } from 'react-redux';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import {
  callState as callStates,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from '../../../store/actions/callActions';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';

const GroupCall = ({
  callState,
  localStream,
  groupCallActive,
  groupCallStreams,
  setCameraEnabled,
  setMicrophoneEnabled,
}) => {
  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };

  return (
    <>
      {!groupCallActive &&
        localStream &&
        callState !== callStates.CALL_IN_PROGRESS && (
          <GroupCallButton onClickHandler={createRoom} label='Create room' />
        )}
      {groupCallActive && (
        <GroupCallRoom
          setCameraEnabled={setCameraEnabled}
          setMicrophoneEnabled={setMicrophoneEnabled}
          groupCallStreams={groupCallStreams}
        />
      )}
      {groupCallActive && (
        <GroupCallButton label='Leave room' onClickHandler={leaveRoom} />
      )}
    </>
  );
};

const mapStoreStateToProps = ({ call }) => ({
  ...call,
});

const mapActionsToProps = (dispatch) => {
  return {
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) =>
      dispatch(setLocalMicrophoneEnabled(enabled)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(GroupCall);
