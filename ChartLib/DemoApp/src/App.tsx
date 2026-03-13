import { BarChartDemo } from '@/components/BarChartDemo';
import { LineChartDemo } from '@/components/LineChartDemo';
import { GaugeChartDemo } from '@/components/GaugeChartDemo';

function App() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>ChartComponents Demo</h1>
      <BarChartDemo />
      <LineChartDemo />
      <GaugeChartDemo />
    </div>
  );
}

export default App;
