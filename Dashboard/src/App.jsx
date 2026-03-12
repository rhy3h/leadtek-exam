import { useState, useEffect } from 'react'

function App() {
  const [stats, setStats] = useState({
    cpuLoad: 0,
    memPercent: 0,
    diskUsage: [],
    netSpeed: { down: '0', up: '0' },
    timestamp: '--:--:--'
  });
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    const host = import.meta.env.VITE_WS_HOST || 'localhost';
    const port = import.meta.env.VITE_WS_PORT || '3001';
    let socket;
    let reconnectTimer;
    let isComponentMounted = true;

    const connect = () => {
      if (!isComponentMounted) return;

      socket = new WebSocket(`ws://${host}:${port}`);

      socket.onopen = () => {
        console.log('Connected to server');
        setStatus('connected');
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'INITIAL_DATA' || message.type === 'TICK') {
            setStats(message.data);
          }
        } catch {
          // Handle non-JSON messages if any
          console.log('Server message:', event.data);
        }
      };

      socket.onclose = () => {
        console.log('Disconnected from server');
        setStatus('disconnected');
        
        if (isComponentMounted) {
          reconnectTimer = setTimeout(() => {
             console.log('Attempting to reconnect...');
             connect();
          }, 3000);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Closing the socket ensures onclose gets fired to start the reconnect timer
        socket.close();
      };
    };

    connect();

    return () => {
      isComponentMounted = false;
      clearTimeout(reconnectTimer);
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 box-border">
      <header className="mb-8 text-left">
        <h1 className="text-[2.5rem] m-0 bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] bg-clip-text text-transparent leading-tight">System Monitor</h1>
        <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full text-sm font-medium bg-[#161b22]/60 border border-[#f0f6fc]/10 mt-4">
          <span className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-[#3fb950] shadow-[0_0_10px_#3fb950]' : 'bg-[#f85149]'}`}></span>
          {status.toUpperCase()}
        </div>
      </header>

      <main className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6 w-full">
        <section className="bg-[#161b22]/60 backdrop-blur-xl border border-[#f0f6fc]/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#58a6ff] flex flex-col min-h-[240px]">
          <span className="text-sm text-[#8b949e] font-medium uppercase tracking-[0.05em] mb-4">CPU Load</span>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="text-[2.5rem] font-bold text-[#f0f6fc] leading-none">
              {stats.cpuLoad}<span className="text-xl text-[#8b949e] ml-1">%</span>
            </div>
            <div className="h-2 bg-white/5 rounded overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] rounded transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" 
                style={{ width: `${stats.cpuLoad}%` }}
              ></div>
            </div>
          </div>
        </section>

        <section className="bg-[#161b22]/60 backdrop-blur-xl border border-[#f0f6fc]/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#58a6ff] flex flex-col min-h-[240px]">
          <span className="text-sm text-[#8b949e] font-medium uppercase tracking-[0.05em] mb-4">Memory Usage</span>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="text-[2.5rem] font-bold text-[#f0f6fc] leading-none">
              {stats.memPercent}<span className="text-xl text-[#8b949e] ml-1">%</span>
            </div>
            <div className="h-2 bg-white/5 rounded overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] rounded transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" 
                style={{ width: `${stats.memPercent}%` }}
              ></div>
            </div>
          </div>
        </section>

        <section className="bg-[#161b22]/60 backdrop-blur-xl border border-[#f0f6fc]/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#58a6ff] flex flex-col min-h-[240px]">
          <span className="text-sm text-[#8b949e] font-medium uppercase tracking-[0.05em] mb-4">Network Speed</span>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div>
              <div className="text-xs text-[#8b949e] font-medium uppercase tracking-[0.05em] mb-1">Download</div>
              <div className="text-[1.8rem] font-bold text-[#f0f6fc] leading-none">
                {stats.netSpeed.down}<span className="text-xl text-[#8b949e] ml-1">KB/s</span>
              </div>
            </div>
            <div className="border-t border-[#f0f6fc]/10 pt-4">
              <div className="text-xs text-[#8b949e] font-medium uppercase tracking-[0.05em] mb-1">Upload</div>
              <div className="text-[1.8rem] font-bold text-[#f0f6fc] leading-none">
                {stats.netSpeed.up}<span className="text-xl text-[#8b949e] ml-1">KB/s</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#161b22]/60 backdrop-blur-xl border border-[#f0f6fc]/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#58a6ff] flex flex-col min-h-[240px]">
          <span className="text-sm text-[#8b949e] font-medium uppercase tracking-[0.05em] mb-4">Storage</span>
          <div className="flex-1 flex flex-col gap-3 justify-center">
            {stats.diskUsage.map((disk, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm text-[#f0f6fc]">
                  <span>{disk.drive}</span>
                  <span>{disk.use}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#58a6ff] to-[#1f6feb] rounded transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" 
                    style={{ width: `${disk.use}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-8 text-[#8b949e] text-sm md:text-left text-center">
        Last updated: {stats.timestamp}
      </footer>
    </div>
  )
}

export default App
