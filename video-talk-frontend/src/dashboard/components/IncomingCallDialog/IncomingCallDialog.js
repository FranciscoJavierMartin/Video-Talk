import React from 'react';
import { acceptIncomingCallRequest, rejectIncomingCallRequest } from '../../../utils/webRTC/webRTCHandler';
import './IncomingCallDialog.css';

const IncomingCallDialog = ({ callerUsername }) => {
  const handleAcceptButtonPressed = () => {
    acceptIncomingCallRequest();
  };

  const handleRejectedButtonPressed = () => {
    rejectIncomingCallRequest();
  };

  return (
    <div className='direct_call_dialog background_secondary_color'>
      <span className='direct_call_dialog_caller_name'>{callerUsername}</span>
      <div className='direct_call_dialog_button_container'>
        <button
          className='direct_call_dialog_accept_button'
          onClick={handleAcceptButtonPressed}
        >
          Accept
        </button>
        <button
          className='direct_call_dialog_reject_button'
          onClick={handleRejectedButtonPressed}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default IncomingCallDialog;
