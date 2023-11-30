import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const fullReloadAlways = {
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' });
    return [];
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/client',
  build: { outDir: '../dist' },
  publicDir: '../../public',
  plugins: [react(), fullReloadAlways]
});
