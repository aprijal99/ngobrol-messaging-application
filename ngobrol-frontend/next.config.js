/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WEBSOCKET_URL: 'http://localhost:7080',
  },
  // output: 'standalone',
}

module.exports = nextConfig
