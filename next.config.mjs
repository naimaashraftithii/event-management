/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // যেসব external host থেকে ইমেজ আসবে
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;


