const express = require('express');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const { v4: uuidv4 } = require('uuid');
const groupCallHandler = require('./groupCallHandler');
const PORT = 5000;

const app = express();

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use('/peerjs', peerServer);

groupCallHandler.createPeerServerListeners(peerServer);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let peers = [];
let groupCallRooms = [];

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};

io.on('connection', (socket) => {
  socket.emit('connection', null);
  console.log('New user connected');

  socket.on('register-new-user', (data) => {
    peers.push({
      username: data.username,
      socketId: data.socketId,
    });

    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });

    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  socket.on('disconnect', () => {
    peers = peers.filter((peer) => peer.socketId !== socket.id);
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });

    groupCallRooms = groupCallRooms.filter(room => room.socketId !== socket.id);
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  socket.on('pre-offer', (data) => {
    console.log(data);
    io.to(data.callee.socketId).emit('pre-offer', {
      callerUsername: data.caller.username,
      callerSocketId: socket.id,
    });
  });

  socket.on('pre-offer-answer', (data) => {
    io.to(data.callerSocketId).emit('pre-offer-answer', {
      answer: data.answer,
    });
  });

  socket.on('webRTC-offer', (data) => {
    io.to(data.calleeSocketId).emit('webRTC-offer', {
      offer: data.offer,
    });
  });

  socket.on('webRTC-answer', (data) => {
    io.to(data.callerSocketId).emit('webRTC-answer', {
      answer: data.answer,
    });
  });

  socket.on('webRTC-candidate', (data) => {
    io.to(data.connectedUserSocketId).emit('webRTC-candidate', {
      candidate: data.candidate,
    });
  });

  socket.on('user-hanged-up', (data) => {
    io.to(data.connectedUserSocketId).emit('user-hanged-up');
  });

  socket.on('group-call-register', (data) => {
    const roomId = uuidv4();
    socket.join(roomId);

    const newGroupCallRoom = {
      peerId: data.peerId,
      hostName: data.username,
      socketId: socket.id,
      roomId,
    };

    groupCallRooms.push(newGroupCallRoom);
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  socket.on('group-call-join-request', (data) => {
    io.to(data.roomId).emit('group-call-join-request', {
      peerId: data.peerId,
      streamId: data.streamId,
    });

    socket.join(data.roomId);
  });

  socket.on('group-call-user-left', (data) => {
    socket.leave(data.roomId);
    io.to(data.roomId).emit('group-call-user-left',  {
      streamId: data.streamId
    })
  })

  socket.on('group-call-closed-by-host',(data) => {
    groupCallRooms = groupCallRooms.filter(room => room.peerId !== data.peerId);

    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    })
  })
});
