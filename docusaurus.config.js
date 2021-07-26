const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Findora Wiki',
  tagline: 'Dinosaurs are cool',
  url: 'https://wiki.findora.org/',
  baseUrl: '/findora-wiki/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'FindoraNetwork', // Usually your GitHub org/user name.
  projectName: 'findora-wiki', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Findora Wiki',
      logo: {
        alt: 'My Site Logo',
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
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/findora',
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
      },
    ],
  ],
};
