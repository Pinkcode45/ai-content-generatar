/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn-icons-png.flaticon.com',
            pathname: '**',
          },

          {
            protocol: 'https',
            hostname: 'Fcdn-icons-png.flaticon.com',
            pathname: '**',
          },
        ],
    },
};

export default nextConfig;
 