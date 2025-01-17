import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import autoprefixer from 'autoprefixer';

export default defineConfig(() => {
  return {
    base: '/',
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          chunkFileNames: 'app/js/[name]-[hash].js',
          entryFileNames: 'app/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.(css|scss)$/.test(assetInfo.name)) {
              return 'app/css/[name]-[hash][extname]';
            }
            if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(assetInfo.name)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/\.(mp4|webm|ogg|mov|avi|mkv)$/.test(assetInfo.name)) {
              return 'assets/videos/[name]-[hash][extname]';
            }
            if (/\.(mp3|wav|flac|aac|ogg|m4a|aiff)$/.test(assetInfo.name)) {
              return 'assets/audios/[name]-[hash][extname]';
            }
            if (/\.(woff2?|eot|ttf|otf|woff)$/.test(assetInfo.name)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            if (/\.(pdf|docx?|xlsx?|pptx?|txt|csv)$/.test(assetInfo.name)) {
              return 'assets/documents/[name]-[hash][extname]';
            }
            if (/\.(ico|png|svg)$/.test(assetInfo.name)) {
              return 'assets/icons/[name]-[hash][extname]';
            }
            if (/\.(zip|rar|7z|tar|gz|gzip)$/.test(assetInfo.name)) {
              return 'assets/archives/[name]-[hash][extname]';
            }
            return 'assets/others/[name]-[hash][extname]';
          },
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}),
        ],
      },
    },
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.vue', '.json', '.scss', '.css'],
    },
    /*server: {
      port: 3000,
      proxy: {},
    },*/
  };
});
