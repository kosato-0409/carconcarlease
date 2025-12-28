/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // LINEミニアプリでは外部スクリプトの読み込みが必要
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig

