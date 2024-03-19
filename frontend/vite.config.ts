import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/paytm",
   server: {
    host: '0.0.0.0', // Allow access from anywhere
    port: 3000, // You can change this to your desired port
  },
  plugins: [react()],
})
