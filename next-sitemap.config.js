/** @type {import('next-sitemap').IConfig} */
// Optional legacy helper — App Router sitemap.ts / robots.ts are the source of truth.
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://divinesimparna.com',
  generateRobotsTxt: false,
  outDir: 'public'
};
