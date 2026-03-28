const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
// Create a single server instance for both
const server = createServer(app); 
const port = process.env.PORT || 10000; // Use the PORT environment variable provided by Render

// Set up WebSocket server
// Attach the WebSocket server to the same HTTP server instance
const wss = new WebSocket.Server({ server, path: '/ws' }); 

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', message => {
        console.log(`Received: ${message}`);
        ws.send(`Server: ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Define your standard HTTP routes
/*
app.get('/', (req, res) => {
    res.send('Hello HTTP and WebSockets!');
});
*/

// use www folder to serve files
app.use(express.static(path.join(__dirname, 'www')));

// Start the server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
