import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import UsernameInput from './components/UsernameInput';
import SubmitButton from './components/SubmitButton';
import { setUsername } from '../store/actions/dashboardActions';
import { DASHBOARD_PAGE } from '../constants/routes';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import './LoginPage.css';
import logo from '../resources/logo.png';

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState('');
  const history = useHistory();

  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    saveUsername(username);
    history.push(DASHBOARD_PAGE);
  };

  return (
    <div className='login-page_container background_main_color'>
      <div className='login-page_login_box background_secondary_color'>
        <div className='login-page_logo_container'>
          <img
            className='login-page_logo_image'
            src={logo}
            alt='Video Talker'
          />
        </div>
        <div className='login-page_title_container'>
          <h2>Get on Board</h2>
        </div>
        <UsernameInput username={username} setUsername={setUsername} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username)),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
