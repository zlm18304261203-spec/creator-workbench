
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 如果项目不在根目录运行，请修改 base
  base: './',
  define: {
    // 确保 process.env 在浏览器环境中可用，防止 geminiService 崩溃
    'process.env': process.env
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
