/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // bạn có thể đổi lại nếu muốn
        destination: "https://thecaovnapi.vercel.app/:path*", // domain API thực tế
        // destination: "https://localhost:5000/:path*",
      },
    ];
  },
};

export default nextConfig;
