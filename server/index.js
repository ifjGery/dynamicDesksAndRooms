const express = require('express');
const http = require('http');
const ws = require('ws');
const app = express();
const port = 8080
const server = http.createServer(app);
const wss = new ws.Server({server});

let allData = {
    reservable: {
        id_100: {
            name: "100th"
        },
        id_101: {
            name: "101th"
        },
    }
}

let allClient = []

wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
        try {
            let data = JSON.parse(message);
            let response = {};
            switch(data.type) {
                case 'login':
                    response.value = 'OK';
                    allClient.push({
                        socket: ws,
                        onFloor: data.floor,
                        nick: data.nick,
                        contact: data.contact
                    });
                    break;
                case 'grab':
                    response.value = 'OK';
                    response.reservable = allData.reservable[data.id];
                    break;
                default:
                    response.value = 'fail';
            }
            ws.send(JSON.stringify(response));
        } catch(e) {
            ws.send('failed');
        }
    });
    ws.send('Hi there (says the websocket server)');
})

server.listen(port, () => {
    console.log(`started on ${port}`);
})

/*
setTimeout(() => {
    allClient.forEach(client => {
        client.socket.send(`you are on ${client.onFloor}`)
    })
}, 5000);
*/