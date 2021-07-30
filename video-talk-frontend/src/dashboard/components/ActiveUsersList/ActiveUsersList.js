import React from 'react';
import { connect } from 'react-redux';
import ActiveUsersListItem from './ActiveUsersListItem';
import './ActiveUsersList.css';

const ActiveUsersList = ({ activeUsers, callState }) => {
  return (
    <div className='active_user_list_container'>
      {activeUsers.map((activeUser) => (
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
          callState={callState}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call
});

export default connect(mapStateToProps)(ActiveUsersList);
