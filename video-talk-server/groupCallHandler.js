const createPeerServerListeners = (peerServer) => {
  peerServer.on('connection', (client) => {
    console.log('Succesfully connected to peer js server');
    console.log(client.id);
  })
}

module.exports = {
  createPeerServerListeners,
}