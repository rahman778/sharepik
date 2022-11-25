/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "i.pinimg.com",
            port: "",
         },
      ],
      domains: [
         "sharepic0d923540f1f3493783d9c65a6ed6c2f2133929-dev.s3.ap-southeast-1.amazonaws.com",
      ],
   },
};

module.exports = nextConfig;
