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
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      mode === "production" ? "development" : mode
    ),
  },
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
    // importToCDN({
    //   modules: [
    //     {
    //       name: "@kvm/kvm-tile-map",
    //       var: "KvmTileMap",
    //       path: "https://cdn.jsdelivr.net/npm/@kvm/kvm-tile-map/dist/index.umd.js",
    //     },
    //   ],
    // }),
  ],
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: {
      "@": path.resolve(__dirname, "./src"),
      classnames: require.resolve("classnames"),
      "@kvm/kvm-tile-map":
        mode === "development"
          ? path.resolve(__dirname, "../../packages/kvm-tile-map/src")
          : path.resolve(__dirname, "./src/types/kvm-tile-map-shim.js"),
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
    // minify: false,
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MIXED_EXPORTS") return;
        if (warning.code === "UNRESOLVED_IMPORT") return;
        warn(warning);
      },
      output: {
        // globals: {
        //   // script 标签引入
        //   "@kvm/kvm-tile-map": "KvmTileMap",
        // },
        manualChunks: {
          // 分包配置
          vendor: ["react", "react-dom", "react-router-dom"],
          recoil: ["recoil", "recoil-persist"],
          antd: ["antd", "@ant-design/icons"],
          utils: ["axios", "qs", "i18next", "react-i18next"],
          hooks: ["ahooks"],
          konva: ["konva", "react-konva"],
          // map: ["@kvm/kvm-tile-map"], // 已使用 CDN
        },
        // entryFileNames: `assets/[name].[hash].js`,
        // chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].k[hash].[ext]`,
      },
    },
  },
}));
