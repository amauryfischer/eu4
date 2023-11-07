/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
		  // Rewrite everything else to use `pages/index`
		  {
			source: '/:path*',
			destination: '/',
		  },
		];
	  },
	experimental: {
	},
	compiler: {
		styledComponents: true,
	}
}

module.exports = nextConfig
