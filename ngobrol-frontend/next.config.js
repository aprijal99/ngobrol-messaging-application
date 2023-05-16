/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WEBSOCKET_URL: 'https://ngobrol-websocket.onrender.com',
  },
}

module.exports = nextConfig
