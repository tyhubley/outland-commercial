/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Old project URLs from the original outlandmanagement.com site.
      // Google still has these cached → they currently 404.
      // Permanent redirect lets Google retire them and pass any link
      // equity to the homepage.
      { source: '/projects', destination: '/', permanent: true },
      { source: '/projects/:slug*', destination: '/', permanent: true },
      // Defensive: anyone hitting plain /service or /services/ index
      { source: '/service', destination: '/', permanent: true },
      { source: '/services', destination: '/', permanent: true },
      { source: '/service-areas', destination: '/sitemap', permanent: true },
    ];
  },
};

export default nextConfig;
