
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

var users = 0;

wss.on('connection', function connection(ws) {

{users++;}

  ws.on('message', function incoming(data) {


    wss.clients.forEach(function each(client) {

      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });

    ws.on('close',function disconnection(ws) {
      {users--;}
     })
  });

  console.log(users);

});
