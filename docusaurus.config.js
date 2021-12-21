const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Findora Wiki',
  tagline: 'Tools, integrations and tutorials to start using and building on Findora.',
  url: 'https://wiki.findora.org/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'FindoraNetwork', // Usually your GitHub org/user name.
  projectName: 'findora-wiki', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Findora Wiki',
      logo: {
        alt: 'Findora Logo',
        src: 'img/logo-findora.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'general/intro',
          position: 'left',
          label: 'Get Started',
        },
        {
          href: 'https://github.com/findoraNetwork',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: '/docs/general/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/dHhY5pte',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/FindoraOfficial',
            },
            {
              label: "Telegram",
              href: 'https://t.me/findoraen',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/FindoraNetwork/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Findora Foundation. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/FindoraNetwork/findora-wiki/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-143942502-1',
          anonymizeIP: true,
        },
      },
    ],
  ],
};
