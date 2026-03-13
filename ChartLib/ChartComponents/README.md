# Chart Components

目標是包裝 Chart 元件使其可共用

## 安裝

```sh
npm install https://github.com/rhy3h/leadtek-exam/releases/download/v1.0.0/chartcomponents-1.0.0.tgz
```

## 功能

 - BarChart
 - GaugeChart
 - LineChart

### BarChart

```js
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
```
### GaugeChart
```js
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
```

### LineChart
```js
import { LineChart } from 'chartcomponents';

export function LineChartDemo() {
  return (
    <section>
      <h2>LineChart — 本週溫度趨勢（20°C）</h2>
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
```
