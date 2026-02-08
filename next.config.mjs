/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // This allows us to import images from external domains if needed later
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
    },
  };
  
  export default nextConfig;