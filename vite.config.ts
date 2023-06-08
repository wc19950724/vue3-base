import createVuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { execSync } from "child_process";
import fs from "fs";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import { TDesignResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import svgLoader from "vite-svg-loader";

import { description, keywords, name } from "./package.json";
// 获取当前分支 commitId
let commitId = "";
if (fs.existsSync(".git")) {
  try {
    commitId = execSync("git rev-parse --short HEAD").toString().trim();
  } catch (error) {
    commitId = "";
  }
}

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]",
      },
    },
  },
  plugins: [
    createVuePlugin(),
    vueJsx(),
    svgLoader(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/],
      imports: ["pinia", "vue", "vue-router"],
      eslintrc: {
        enabled: true,
      },
      resolvers: [TDesignResolver({ library: "vue-next", resolveIcons: true })],
    }),
    Components({
      dirs: ["src/components"],
      include: [/\.vue$/, /\.tsx?$/, /\.vue\?vue/],
      resolvers: [TDesignResolver({ library: "vue-next", resolveIcons: true })],
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: name,
          description,
          keywords: keywords.join(),
          injectScript: `<script type="module" src="./src/main.ts"></script>`,
        },
        tags: [
          {
            injectTo: "body-prepend",
            tag: "div",
            attrs: {
              id: "app",
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            "src/styles/variables.less"
          )}";`,
        },
        math: "strict",
        javascriptEnabled: true,
      },
    },
  },
  define: {
    __COMMITID__: JSON.stringify(commitId),
  },
  server: {
    proxy: {
      "^/api": {
        target: "https://mock.apifox.cn/m1/1642285-0-default",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    open: true,
    host: "0.0.0.0",
    strictPort: false,
  },
});
