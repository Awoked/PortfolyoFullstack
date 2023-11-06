/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["utfs.io", "picsum.photos"],
        remotePatterns: [
            {
                hostname: 'localhost',
                protocol: "http",
                port: '3001'
            }
        ]
    }
}

module.exports = nextConfig
