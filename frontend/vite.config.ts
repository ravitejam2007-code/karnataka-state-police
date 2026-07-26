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
          // Copy all build artifacts to static directory
          fs.cpSync(distDir, staticDir, { recursive: true })
          console.log('[KSP Build] Successfully synced compiled production bundle to static/ directory for Catalyst deployment.')
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
