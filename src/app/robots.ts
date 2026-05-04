import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/control-core',
        '/admin/autofill',
        '/admin/reaper',
        '/admin/assistant',
        '/admin/daily',
        '/admin/bots',
        '/admin/media',
        '/admin/accounts',
        '/admin/integrations',
        '/admin/linked-sites',
        '/admin/submissions',
        '/admin/ads',
        '/admin/revenue',
        '/admin/traffic',
        '/admin/github',
        '/admin/deploy',
        '/admin/app',
        '/admin/community',
        '/admin/setup'
      ],
    },
    sitemap: 'https://forthub.com/sitemap.xml',
  };
}
