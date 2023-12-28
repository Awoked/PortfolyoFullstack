/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                protocol: "http",
                port: "3001",
            },
            {
                hostname: "res.cloudinary.com",
            },
        ],
    },
};

module.exports = nextConfig;
