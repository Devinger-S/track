/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname:"assets.aceternity.com",
      pathname: '**',
      port:"",
      
    },
    {
      protocol: 'https',
      hostname:"lh3.googleusercontent.com",
      pathname: '**',
      port:"",
      // port: '',
      // pathname: '/*',
    },
  ],
},
};

export default nextConfig;
