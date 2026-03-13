import { Gauge } from '@mui/x-charts/Gauge';
import type { ComponentProps } from 'react';

export type GaugeChartProps = ComponentProps<typeof Gauge>;

export function GaugeChart({
  height = 200,
  width = 200,
  valueMin = 0,
  valueMax = 100,
  startAngle = -110,
  endAngle = 110,
  innerRadius = '80%',
  outerRadius = '100%',
  ...props
}: GaugeChartProps) {
  return (
    <Gauge
      height={height}
      width={width}
      valueMin={valueMin}
      valueMax={valueMax}
      startAngle={startAngle}
      endAngle={endAngle}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      {...props}
    />
  );
}
