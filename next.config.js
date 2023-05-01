/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        // Define the path to the CSV file
        source: '/static/sample_data.csv',
        // Set the headers to serve the file as CSV
        headers: [
          {
            key: 'Content-Type',
            value: 'text/csv',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
