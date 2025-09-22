// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Skip ESLint during production builds to avoid
    // “Invalid Options: useEslintrc, extensions” failures
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
