import React from 'react';

const styles = {
  button: {
    width: '50px',
    height: '50px',
    borderRadius: '40px',
    border: '2px solid #e6e5e8',
    textDecoration: 'none',
    backgroundColor: '#282c34',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10px',
    boxShadow: 'none',
    borderImage: 'none',
    borderStyle: 'none',
    borderWidth: '0px',
    outline: 'none',
  },
};

const ConversationButton = ({ onClickHandler, children }) => {
  return (
    <button onClick={onClickHandler} style={styles.button}>
      {children}
    </button>
  );
};

export default ConversationButton;
