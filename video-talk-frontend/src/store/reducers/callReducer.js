import * as callActions from '../actions/callActions';

const initialState = {
  localStream: null,
  callState: callActions.callState.CALL_UNAVAILABLE,
  callingDialogVisible: false,
  callerUsername: '',
  callRejected: {
    rejected: false,
    reason: '',
  },
  remoteStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false,
  groupCallActive: false,
  groupCallStreams: [],
  message: {
    received: false,
    content: '',
  },
};

const reducer = (state = initialState, action) => {
  let res;
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      res = {
        ...state,
        localStream: action.localStream,
      };
      break;
    case callActions.CALL_SET_CALL_STATE:
      res = {
        ...state,
        callState: action.callState,
      };
      break;
    case callActions.CALL_SET_CALLING_DIALOG_VISIBLE:
      res = {
        ...state,
        callingDialogVisible: action.visible,
      };
      break;
    case callActions.CALL_SET_CALLER_USERNAME:
      res = {
        ...state,
        callerUsername: action.callerUsername,
      };
      break;
    case callActions.CALL_SET_CALL_REJECTED:
      res = {
        ...state,
        callRejected: action.callRejected,
      };
      break;
    case callActions.CALL_SET_REMOTE_STREAM:
      res = {
        ...state,
        remoteStream: action.remoteStream,
      };
      break;
    case callActions.CALL_SET_LOCAL_CAMERA_ENABLED:
      res = {
        ...state,
        localCameraEnabled: action.enabled,
      };
      break;
    case callActions.CALL_SET_LOCAL_MICROPHONE_ENABLED:
      res = {
        ...state,
        localMicrophoneEnabled: action.enabled,
      };
      break;
    case callActions.CALL_SET_SCREEN_SHARING_ACTIVE:
      res = {
        ...state,
        screenSharingActive: action.active,
      };
      break;
    case callActions.CALL_RESET_CALL_DATA:
      res = {
        ...state,
        remoteStream: null,
        screenSharingActive: false,
        callerUsername: '',
        localMicrophoneEnabled: true,
        localCameraEnabled: true,
        callingDialogVisible: false,
      };
      break;
    case callActions.CALL_SET_GROUP_CALL_ACTIVE:
      res = {
        ...state,
        groupCallActive: action.active,
      };
      break;
    case callActions.CALL_SET_GROUP_CALL_STREAMS:
      res = {
        ...state,
        groupCallStreams: action.groupCallStreams,
      };
      break;
    case callActions.CALL_CLEAR_GROUP_CALL_DATA:
      res = {
        ...state,
        groupCallActive: false,
        groupCallStreams: [],
        callState: callActions.callState.CALL_AVAILABLE,
        localMicrophoneEnabled: true,
        localCameraEnabled: true,
      };
      break;
    case callActions.CALL_SET_CHAT_MESSAGE:
      res = {
        ...state,
        message: action.message,
      };
      break;
    default:
      res = state;
  }

  return res;
};

export default reducer;
