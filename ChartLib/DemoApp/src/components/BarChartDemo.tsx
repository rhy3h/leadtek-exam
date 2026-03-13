import { BarChart } from 'chartcomponents';

export function BarChartDemo() {
  return (
    <section>
      <h2>BarChart — 月份銷售量</h2>
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['一月', '二月', '三月', '四月', '五月', '六月'] }]}
        series={[
          { data: [4000, 3000, 5000, 2780, 1890, 6390], label: '產品 A' },
          { data: [2400, 1398, 9800, 3908, 4800, 3800], label: '產品 B' },
        ]}
        width={600}
      />
    </section>
  );
}
