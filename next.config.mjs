/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'gatherer.wizards.com',
                port: '',
                pathname: '/Handlers/Image.ashx',
            }
        ]
    }
};

export default nextConfig;
