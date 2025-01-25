/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: '',      // Set this if you're not using a custom domain
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;