import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createStyleImportPlugin } from "vite-plugin-style-import";
import viteCompression from "vite-plugin-compression";
// rollup-plugin-visualizer
// import visualizer from "rollup-plugin-visualizer"; // TODO

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["react-is", "classnames"],
  },
  plugins: [
    react(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: "antd",
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
      ],
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: {
      "@": path.resolve(__dirname, "./src"),
      classnames: path.resolve(
        __dirname,
        "../../node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js"
      ),
    },
  },
  server: {
    // open: 'http://loc-www.karmasgame.com',
    // host: "192.168.2.96", // 本地手机调试
    // port: 80,
    proxy: {
      // '/api': 'http://192.168.0.200:3000',
      "/api": "http://180.184.65.66:7010",
      // "/api": {
      //   target: "http://loc-api.karmasgame.com:4000",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#0077FF", //全局样式
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 分包配置
          vendor: ["react", "react-dom", "react-router-dom"],
          recoil: ["recoil", "recoil-persist"],
          antd: ["antd", "@ant-design/icons"],
          utils: ["axios", "qs", "i18next", "react-i18next"],
          hooks: ["ahooks"],
          konva: ["konva", "react-konva"],
          map: ["@karmaverse/kvm-tile-map"],
        },
        // entryFileNames: `assets/[name].[hash].js`,
        // chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].k[hash].[ext]`,
      },
    },
  },
});
