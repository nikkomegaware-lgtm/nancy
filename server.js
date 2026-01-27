const { WebSocketServer } = require('ws');
const http = require('http');
const express = require('express');

const app = express();
// Create a basic HTTP server instance
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const PORT = process.env.PORT || 8080; // Use process.env.PORT for Render deployment

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        // Broadcast received message to all clients
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});
