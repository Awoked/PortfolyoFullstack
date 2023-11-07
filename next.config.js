/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["utfs.io", "picsum.photos", "personal-strapi-iah4.onrender.com", "res.cloudinary.com"],
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
