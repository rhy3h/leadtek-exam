import { GaugeChart } from 'chartcomponents';

const gauges = [
  { label: '電池電量', value: 72 },
  { label: 'CPU 使用率', value: 45 },
  { label: '磁碟使用率', value: 88 },
];

export function GaugeChartDemo() {
  return (
    <section>
      <h2>GaugeChart — 系統狀態</h2>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {gauges.map(({ label, value }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <GaugeChart value={value} />
            <p>{label}：{value}%</p>
          </div>
        ))}
      </div>
    </section>
  );
}
