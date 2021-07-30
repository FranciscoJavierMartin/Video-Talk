import React, { useEffect, useState } from 'react';
import { sendMessageUsingDataChannel } from '../../../utils/webRTC/webRTCHandler';
import MessegerDisplayer from './MessengerDisplayer';
import './Messenger.css';

const Messenger = ({ message, setDirectCallMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const handleOnKeyDownEvent = (e) => {
    if (e.keyCode === 13) {
      sendMessageUsingDataChannel(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (message.received) {
      setTimeout(() => {
        setDirectCallMessage(false, '');
      }, 3000);
    }
  }, [message.received, setDirectCallMessage]);

  return (
    <>
      <input
        className='messages_input'
        type='text'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleOnKeyDownEvent}
        placeholder='Type your message'
      />
      {message.received && <MessegerDisplayer message={message.content} />}
    </>
  );
};

export default Messenger;
