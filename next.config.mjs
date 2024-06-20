/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	images: {
		unoptimized: true,
	},
	swcMinify: true,

	reactStrictMode: false,
};

export default nextConfig;
