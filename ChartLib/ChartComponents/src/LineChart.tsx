import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import type { ComponentProps } from 'react';

export type LineChartProps = ComponentProps<typeof MuiLineChart>;

export function LineChart({ height = 300, grid = { horizontal: true }, ...props }: LineChartProps) {
  return <MuiLineChart height={height} grid={grid} {...props} />;
}
