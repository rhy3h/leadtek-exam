import WebSocket from 'ws';
import 'dotenv/config';

const port = process.env.PORT || 3001;
const ws = new WebSocket(`ws://localhost:${port}`);

console.log(`Connecting to WebSocket server on ws://localhost:${port}...`);

ws.on('open', () => {
  console.log('✅ Connected to server');
});

ws.on('message', (data) => {
  try {
    const { type, data: stats } = JSON.parse(data);

    if (type === 'INITIAL_DATA') {
      console.log('\n--- Initial System Stats ---');
      console.table(stats);
    } else if (type === 'TICK') {
      process.stdout.write(`\r[${stats.timestamp}] CPU: ${stats.cpuLoad}% | MEM: ${stats.memPercent}% | Net Down: ${stats.netSpeed.down} KB/s   `);
    } else {
      console.log('Received:', data.toString());
    }
  } catch {
    console.log('Received (text):', data.toString());
  }
});

ws.on('close', () => {
  console.log('\n❌ Disconnected from server');
  process.exit(0);
});

ws.on('error', (error) => {
  console.error(`\n🚨 WebSocket error: ${error.message}`);
  process.exit(1);
});

// Auto-close after 10 seconds for testing
setTimeout(() => {
  console.log('\n\nTest finished, closing connection.');
  ws.close();
}, 10000);
