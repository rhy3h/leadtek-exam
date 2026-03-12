import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server instance
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Echo the message back to the client
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Send a welcome message
  ws.send('Welcome to the WebSocket API!');
});

app.get('/health', (req, res) => {
  res.send('Server is running');
});

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
