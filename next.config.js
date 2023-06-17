/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	compiler: {
		styledComponents: true,
	}
}

module.exports = nextConfig
