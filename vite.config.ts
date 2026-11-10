import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // caminhos relativos: funciona tanto em domínio próprio quanto em usuario.github.io/repo
  base: './',
  server: { port: 4173, strictPort: true, host: '127.0.0.1' }
});
