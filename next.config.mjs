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
      // Renamed slug: Landscape Enhancements -> Landscape Installations
      // Preserves any SEO equity Google has on the old URLs.
      { source: '/services/landscape-enhancements', destination: '/services/landscape-installations', permanent: true },
      { source: '/services/landscape-enhancements/:city', destination: '/services/landscape-installations/:city', permanent: true },
    ];
  },
};

export default nextConfig;
