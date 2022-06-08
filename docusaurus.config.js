const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require('remark-math');
const katex = require('rehype-katex');

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
      content: `<div className="announce-bar"><strong>🎉 $100m in Ecosystem Grants</strong>&nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://www.findora.foundation/grants/" target="_blank" class="link">Apply Now</a>
        </div> `,
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
          remarkPlugins: [math],
          rehypePlugins: [katex],
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
  plugins: [
    [
      "docusaurus-plugin-dotenv",
      {
        path: "./.env", // The path to your environment variables.
        safe: true, // If false ignore safe-mode, if true load './.env.example', if a string load that file as the sample
        systemvars: false, // Set to true if you would rather load all system variables as well (useful for CI purposes)
        silent: false, //  If true, all warnings will be suppressed
        expand: false, // Allows your variables to be "expanded" for reusability within your .env file
        defaults: false, //  Adds support for dotenv-defaults. If set to true, uses ./.env.defaults
        ignoreStub: true,
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};
