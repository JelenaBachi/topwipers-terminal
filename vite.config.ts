import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), svgr()],
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    server: {
      proxy: {
        '/api': {
          target: 'https://end.ndv.biz',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/api/, '/bot/v1'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = (env.TW_KEY || '').trim();
              if (key) {
                proxyReq.setHeader('tw-key', key);
              }
            });
          },
        },
      },
    },
  };
});
