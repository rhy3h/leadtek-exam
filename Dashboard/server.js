import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import si from 'systeminformation';
import 'dotenv/config';

const app = express();
const port = process.env.VITE_WS_PORT || process.env.PORT || 3001;

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server instance
const wss = new WebSocketServer({ server });

let latestStats = {
  cpuLoad: 0,
  memPercent: 0,
  diskUsage: [],
  netSpeed: { down: '0', up: '0' },
  timestamp: ''
};

const updateSystemData = async () => {
  try {
    const [cpu, mem, fs, net] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.networkStats()
    ]);

    latestStats = {
      cpuLoad: parseFloat(cpu.currentLoad.toFixed(1)),
      memPercent: parseFloat(((mem.used / mem.total) * 100).toFixed(1)),
      diskUsage: fs.slice(0, 2).map(disk => ({
        drive: disk.mount,
        use: parseFloat(disk.use.toFixed(1))
      })),
      netSpeed: {
        down: (net[0].rx_sec / 1024).toFixed(1),
        up: (net[0].tx_sec / 1024).toFixed(1)
      },
      timestamp: new Date().toLocaleTimeString()
    };
  } catch (error) {
    console.error("系統數據抓取失敗:", error);
  }
};

setInterval(updateSystemData, 1000);

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.send(JSON.stringify({ type: 'INITIAL_DATA', data: latestStats }));

  const pushInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: 'TICK', data: latestStats }));
    }
  }, 1000);

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Echo the message back to the client
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    clearInterval(pushInterval);
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
