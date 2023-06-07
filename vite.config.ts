import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // base: '/',
    server: {
      port: Number(env.PORT),
      watch: {
        usePolling: true,
      },
    },
    plugins: [react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }), tsconfigPaths()],
    resolve: {
      alias: [{ find: /^~/, replacement: '' }],
    },
    define: {
      process: process,
    },
    build: { chunkSizeWarningLimit: 3000 },
    css: {
      modules: {
        generateScopedName: 'lini-[local]-[hash:base64:5]',
        localsConvention: 'camelCaseOnly',
      },
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          require('tailwindcss/nesting'),
          require('postcss-preset-env'),
        ],
      },
      /*preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "src/styles/vars.scss";`,
        },
      },*/
    },
  };
});
