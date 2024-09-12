/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    experimental: {
        instrumentationHook: true
    },
};

export default nextConfig;
