import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import githubContributions from './api/github-contributions.ts';
import { readConfig } from './src/lib/config/runtime.ts';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  if (mode === 'fixture') env.VITE_DATA_MODE = 'fixture';
  if (mode === 'live') env.VITE_DATA_MODE = 'live';
  readConfig(env, command === 'build');
  return {
    plugins: [
      react(),
      {
        name: 'github-contributions',
        configureServer(server) {
          server.middlewares.use(
            '/api/github-contributions',
            (request, response) => {
              void githubContributions(request, response);
            },
          );
        },
      },
    ],
    define: {
      'import.meta.env.VITE_DATA_MODE': JSON.stringify(
        env.VITE_DATA_MODE ?? 'static',
      ),
    },
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
      watch: {
        ignored: [
          '**/.agents/**',
          '**/test-results/**',
          '**/playwright-report/**',
        ],
      },
    },
    build: { sourcemap: false, manifest: true },
  };
});
