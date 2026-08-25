import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Custom plugin to automatically sync compiled build from frontend/dist to static/ for Catalyst Slate deployment
function copyToStaticPlugin() {
  return {
    name: 'copy-to-static',
    closeBundle() {
      try {
        const distDir = path.resolve(__dirname, 'dist')
        const staticDir = path.resolve(__dirname, '../static')

        if (fs.existsSync(distDir)) {
          // Clean previous static directory to remove stale chunks
          if (fs.existsSync(staticDir)) {
            fs.rmSync(staticDir, { recursive: true, force: true })
          }
          fs.mkdirSync(staticDir, { recursive: true })
          // Copy all fresh build artifacts to static directory
          fs.cpSync(distDir, staticDir, { recursive: true })
          console.log('[KSP Build] Successfully synced clean production bundle to static/ directory for Catalyst deployment.')
        }
      } catch (err) {
        console.error('[KSP Build Error] Failed to sync bundle to static/:', err)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyToStaticPlugin(),
  ],
  server: {
    proxy: {
      '/app/ksp_function': {
        target: 'https://ksp-60079542184.development.catalystserverless.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
