/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		fast: process.env.NEXT_PUBLIC_FAST
	},
	compiler: {
		styledComponents: true
	},
	experimental: {
		instrumentationHook: true
	}
}

export default nextConfig;
