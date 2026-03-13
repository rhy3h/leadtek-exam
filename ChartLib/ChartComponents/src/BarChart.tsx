import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import type { ComponentProps } from 'react';

export type BarChartProps = ComponentProps<typeof MuiBarChart>;

export function BarChart({ height = 300, grid = { horizontal: true }, ...props }: BarChartProps) {
  return <MuiBarChart height={height} grid={grid} {...props} />;
}
