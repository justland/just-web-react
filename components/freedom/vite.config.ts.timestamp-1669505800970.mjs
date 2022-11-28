// vite.config.ts
import react from "file:///D:/code/justland/just-web-react/node_modules/.pnpm/@vitejs+plugin-react@2.2.0_vite@3.2.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/code/justland/just-web-react/node_modules/.pnpm/vite@3.2.4_@types+node@16.18.3/node_modules/vite/dist/node/index.js";
import { resolve } from "node:path";
import externals from "file:///D:/code/justland/just-web-react/node_modules/.pnpm/rollup-plugin-node-externals@4.1.1_rollup@2.79.1/node_modules/rollup-plugin-node-externals/dist/esm/index.js";
var __vite_injected_original_dirname = "D:\\code\\justland\\just-web-react\\components\\freedom";
var vite_config_default = defineConfig({
  plugins: [
    react({ exclude: [/\.spec\.tsx?$/, /\.stories\.tsx?$/] }),
    { ...externals(), enforce: "pre" }
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "ts/index.tsx"),
      formats: ["es", "cjs"],
      fileName: "react-freedom"
    },
    minify: false,
    rollupOptions: {
      output: {
        exports: "named"
      }
    },
    sourcemap: true
  },
  resolve: {
    alias: {
      "@storybook/jest": "vitest"
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "scripts/setup-test.ts",
    typecheck: {
      tsconfig: "./tsconfig.json"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXGp1c3RsYW5kXFxcXGp1c3Qtd2ViLXJlYWN0XFxcXGNvbXBvbmVudHNcXFxcZnJlZWRvbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kZVxcXFxqdXN0bGFuZFxcXFxqdXN0LXdlYi1yZWFjdFxcXFxjb21wb25lbnRzXFxcXGZyZWVkb21cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGUvanVzdGxhbmQvanVzdC13ZWItcmVhY3QvY29tcG9uZW50cy9mcmVlZG9tL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlL2NsaWVudFwiIC8+XG5cbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IGV4dGVybmFscyBmcm9tICdyb2xsdXAtcGx1Z2luLW5vZGUtZXh0ZXJuYWxzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoeyBleGNsdWRlOiBbL1xcLnNwZWNcXC50c3g/JC8sIC9cXC5zdG9yaWVzXFwudHN4PyQvXSB9KSxcbiAgICB7IC4uLmV4dGVybmFscygpLCBlbmZvcmNlOiAncHJlJyB9XG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICd0cy9pbmRleC50c3gnKSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgICBmaWxlTmFtZTogJ3JlYWN0LWZyZWVkb20nXG4gICAgfSxcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBleHBvcnRzOiAnbmFtZWQnXG4gICAgICB9XG4gICAgfSxcbiAgICBzb3VyY2VtYXA6IHRydWVcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQHN0b3J5Ym9vay9qZXN0JzogJ3ZpdGVzdCdcbiAgICB9XG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIHNldHVwRmlsZXM6ICdzY3JpcHRzL3NldHVwLXRlc3QudHMnLFxuICAgIHR5cGVjaGVjazoge1xuICAgICAgdHNjb25maWc6ICcuL3RzY29uZmlnLmpzb24nXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUdBLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxlQUFlO0FBTnRCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU0sRUFBRSxTQUFTLENBQUMsaUJBQWlCLGtCQUFrQixFQUFFLENBQUM7QUFBQSxJQUN4RCxFQUFFLEdBQUcsVUFBVSxHQUFHLFNBQVMsTUFBTTtBQUFBLEVBQ25DO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsSUFDQSxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsbUJBQW1CO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsSUFDWixXQUFXO0FBQUEsTUFDVCxVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
