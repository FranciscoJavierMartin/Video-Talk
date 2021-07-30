import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions';
import * as webRTCHanlder from '../webRTC/webRTCHandler';
import * as webRTCGroupCallHandler from '../webRTC/webRTCGroupCallHandler';

const SERVER = 'http://localhost:5000';

let socket;

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};

export const connectWithWebServer = () => {
  socket = socketClient(SERVER);

  socket.on('connection', () => {
    console.log('Successfuly connected with wss server');
  });

  socket.on('broadcast', (data) => {
    handleBroadcastEvents(data);
  });

  socket.on('pre-offer', (data) => {
    webRTCHanlder.handlerPreOffer(data);
  });

  socket.on('pre-offer-answer', (data) => {
    webRTCHanlder.handlerPreOfferAnswer(data);
  });

  socket.on('webRTC-offer', (data) => {
    webRTCHanlder.handlerOffer(data);
  });

  socket.on('webRTC-answer', (data) => {
    webRTCHanlder.handlerAnswer(data);
  });

  socket.on('webRTC-candidate', (data) => {
    webRTCHanlder.handleCandidate(data);
  });

  socket.on('user-hanged-up', () => {
    webRTCHanlder.handleUserHangedUp();
  });

  socket.on('group-call-join-request', (data) => {
    webRTCGroupCallHandler.connectToNewUser(data);
  });

  socket.on('group-call-user-left', (data) => {
    webRTCGroupCallHandler.removeInactiveStream(data);
  });
};

export const registerNewUser = (username) => {
  socket.emit('register-new-user', {
    username,
    socketId: socket.id,
  });
};

export const sendPreOffer = (data) => {
  socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data) => {
  socket.emit('pre-offer-answer', data);
};

export const sendOffer = (data) => {
  socket.emit('webRTC-offer', data);
};

export const sendWebRTCOffer = (data) => {
  socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data) => {
  socket.emit('webRTC-answer', data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit('webRTC-candidate', data);
};

export const sendUserHangedUp = (data) => {
  socket.emit('user-hanged-up', data);
};

export const registerGroupCall = (data) => {
  socket.emit('group-call-register', data);
};

export const userWantsToJoinGroupCall = (data) => {
  socket.emit('group-call-join-request', data);
};

export const userLeftGroupCall = (data) => {
  socket.emit('group-call-user-left', data);
};

export const groupCallClosedByHost = (data) => {
  socket.emit('group-call-closed-by-host', data);
};

export const handleBroadcastEvents = (data) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      const activeUsers = data.activeUsers.filter(
        (activeUser) => activeUser.socketId !== socket.id
      );
      store.dispatch(dashboardActions.setActiveUsers(activeUsers));
      break;
    case broadcastEventTypes.GROUP_CALL_ROOMS:
      const groupCallRooms = data.groupCallRooms.filter(
        (room) => room.socketId !== socket.id
      );
      const activeGroupCallRoomId =
        webRTCGroupCallHandler.checkActiveGroupCall();

      if (activeGroupCallRoomId) {
        const room = groupCallRooms.find(
          (room) => room.roomId === activeGroupCallRoomId
        );
        if (!room) {
          webRTCGroupCallHandler.clearGroupData();
        }
      }
      store.dispatch(dashboardActions.setGroupCalls(groupCallRooms));
      break;
    default:
      break;
  }
};
