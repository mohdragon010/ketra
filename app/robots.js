export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/notes/*', '/subjects/*'],
      },
    ],
    sitemap: 'https://ketra.vercel.app/sitemap.xml',
  };
}

