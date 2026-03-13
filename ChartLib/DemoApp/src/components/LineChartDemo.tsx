import { LineChart } from 'chartcomponents';

export function LineChartDemo() {
  return (
    <section>
      <h2>LineChart — 本週溫度趨勢（°C）</h2>
      <LineChart
        xAxis={[{ data: ['週一', '週二', '週三', '週四', '週五', '週六', '週日'], scaleType: 'point' }]}
        series={[
          { data: [18, 20, 23, 19, 25, 27, 22], label: '台北' },
          { data: [15, 17, 20, 16, 21, 24, 19], label: '台中' },
        ]}
        width={600}
      />
    </section>
  );
}
