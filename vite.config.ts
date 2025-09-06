import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/SS220-Political-Map/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
