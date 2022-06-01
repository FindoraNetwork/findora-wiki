const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Findora Wiki",
  tagline:
    "Tools, integrations and tutorials to start using and building on Findora.",
  url: "https://wiki.findora.org/",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "FindoraNetwork", // Usually your GitHub org/user name.
  projectName: "findora-wiki", // Usually your repo name.
  customFields: {
    welcomeToDocs: "Welcome to the Findora Docs",
  },
  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
    },
    announcementBar: {
      id: "announceBar",
      content:
        '<div className="announce-bar"><strong>🎉 $100m in Ecosystem Grants</strong>  <a target="_blank" rel="noopener noreferrer" href="https://www.findora.foundation/grants/" target="_blank" className="link">Apply Now</a></div>',
      backgroundColor: "#5c17e6",
      textColor: "#ffffff",
      isCloseable: true,
    },
    navbar: {
      title: "Findora Wiki",
      logo: {
        alt: "Findora Logo",
        src: "img/logo-findora.svg",
      },
      items: [
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "tutorialSidebar",
          label: "All Docs",
        },
        {
          type: "dropdown",
          label: "Community",
          position: "right",
          items: [
            {
              href: "https://twitter.com/FindoraOfficial",
              label: "Twitter",
            },
            {
              href: "https://t.me/findoraen",
              label: "Telegram",
            },
            {
              href: "https://discord.gg/dHhY5pte",
              label: "Discord",
            },
            {
              href: "https://medium.com/findorafoundation",
              label: "Medium",
            },
            {
              href: "https://github.com/findoraNetwork",
              label: "GitHub",
            },

            // { to: "docs/introduction/intro", label: "Learn" },
          ],
        },

        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },

    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/FindoraNetwork/findora-wiki/edit/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleAnalytics: {
          trackingID: "UA-143942502-1",
          anonymizeIP: true,
        },
      },
    ],
  ],
};
