import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ChartComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: (id) => {
        const packages = [
          'react',
          'react-dom',
          '@mui/material',
          '@mui/x-charts',
          '@emotion/react',
          '@emotion/styled',
        ];
        return packages.some((pkg) => id === pkg || id.startsWith(pkg + '/'));
      },
    },
  },
})
