import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createStyleImportPlugin } from "vite-plugin-style-import";
import viteCompression from "vite-plugin-compression";
import { Plugin as importToCDN } from "vite-plugin-cdn-import";
// rollup-plugin-visualizer
// import visualizer from "rollup-plugin-visualizer"; // TODO

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  optimizeDeps: {
    // 预构建依赖：impetus(IIFE), mouse-wheel/touch-pinch/touch-position(CommonJS)
    include: [
      "react-is",
      "classnames",
      "impetus",
      "mouse-wheel",
      "touch-pinch",
      "touch-position",
    ],
    // force: true,
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
    importToCDN({
      modules: [
        {
          name: "@karmaverse/kvm-tile-map",
          var: "KvmTileMap",
          path: "https://cdn.jsdelivr.net/npm/@karmaverse/kvm-tile-map/dist/index.umd.js",
        },
      ],
    }),
  ],
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // ...(mode === "development"
      //   ? {
      //       "@karmaverse/kvm-tile-map": path.resolve(
      //         __dirname,
      //         "../../packages/kvm-tile-map/src"
      //       ),
      //     }
      //   : {}),
      // classnames: path.resolve(
      //   __dirname,
      //   "../../node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js"
      // ),
      classnames: require.resolve("classnames"),
    },
    // dedupe: ["classnames"],
  },
  commonjsOptions: {
    include: [/node_modules/],
    transformMixedEsModules: true,
  },
  server: {
    // host: "192.168.2.96", // 本地手机调试
    // port: 80,
    proxy: {
      // '/api': 'http://192.168.0.200:3000',
      "/api": "http://180.184.65.66:7010",
      // "/api": {
      //   target: "http://loc-api.xxx.com:4000",
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
      // external: ["@karmaverse/kvm-tile-map"], // script 标签引入
      onwarn(warning, warn) {
        // 忽略 CommonJS/ESM 混用警告
        if (warning.code === "MIXED_EXPORTS") return;
        warn(warning);
      },
      output: {
        // globals: { // script 标签引入
        //   "@karmaverse/kvm-tile-map": "KvmTileMap",
        // },
        manualChunks: {
          // 分包配置
          vendor: ["react", "react-dom", "react-router-dom"],
          recoil: ["recoil", "recoil-persist"],
          antd: ["antd", "@ant-design/icons"],
          utils: ["axios", "qs", "i18next", "react-i18next"],
          hooks: ["ahooks"],
          konva: ["konva", "react-konva"],
          // map: ["@karmaverse/kvm-tile-map"], // 已使用 CDN
        },
        // entryFileNames: `assets/[name].[hash].js`,
        // chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].k[hash].[ext]`,
      },
    },
  },
}));
