const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

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
      title: "Findora",
      logo: {
        alt: "Findora Logo",
        src: "img/logo-findora.svg",
      },
      items: [
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "tutorialSidebar",
          label: "Home",
        },
        {
          type: "docsVersion",
          position: "left",
          to: "docs/introduction/intro",
          label: "Introduction",
        },
        {
          type: "docsVersion",
          position: "left",
          to: "docs/components/transfers/confidential/Overview",
          label: "Modules",
        },
        {
          type: "docsVersion",
          position: "left",
          to: "docs/guides/get_fra/buy_fra",
          label: "Use",
        },
        {
          type: "docsVersion",
          position: "left",
          to: "docs/developers/evm/web3",
          label: "Build",
        },
        {
          type: "docsVersion",
          position: "left",
          to: "docs/validators/validators-get-started",
          label: "Validate",
        },
        // {
        //   type: "dropdown",
        //   label: "Community",
        //   position: "right",
        //   items: [
        //     {
        //       href: "https://twitter.com/FindoraOfficial",
        //       label: "Twitter",
        //     },
        //     {
        //       href: "https://t.me/findoraen",
        //       label: "Telegram",
        //     },
        //     {
        //       href: "https://discord.gg/dHhY5pte",
        //       label: "Discord",
        //     },
        //     {
        //       href: "https://medium.com/findorafoundation",
        //       label: "Medium",
        //     },
        //     {
        //       href: "https://github.com/findoraNetwork",
        //       label: "GitHub",
        //     },

        //     // { to: "docs/introduction/intro", label: "Learn" },
        //   ],
        // },
        {
          type: "html",
          position: "right",
          value: `
            <div class="earth-container">
              <img src="/img/earth_icon.png" class="earth-logo" />
            </div>`,
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      // logo: {
      //   alt: "Facebook Open Source Logo",
      //   src: "img/oss_logo.png",
      //   href: "https://opensource.facebook.com",
      //   width: 160,
      //   height: 51,
      // },
      // links: [
      //   {
      //     title: "Technology",
      //     items: [
      //       {
      //         label: "Findora OG",
      //         to: "docs/",
      //       },
      //       {
      //         label: "FINDORA X",
      //         to: "docs/",
      //       },
      //       {
      //         label: "FINDORA ZK",
      //         to: "docs/",
      //       },
      //       {
      //         label: "FINDORA CR",
      //         to: "docs/",
      //       },
      //     ],
      //   },
      //   {
      //     title: "Developers",
      //     items: [
      //       {
      //         label: "Get Started",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Github",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Mainnet",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Testnet",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Technical documentation",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Whitepaper",
      //         to: "docs/",
      //       },
      //     ],
      //   },
      //   {
      //     title: "Use Findora",
      //     items: [
      //       {
      //         label: "Wallet",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Native Chain Explorer",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Smart Chain Explorer",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Bridge",
      //         to: "docs/",
      //       },
      //     ],
      //   },
      //   {
      //     title: "General",
      //     items: [
      //       {
      //         label: "About us",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Staking",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Blog",
      //         to: "docs/",
      //       },
      //       {
      //         label: "Career",
      //         to: "docs/",
      //       },
      //       {
      //         label: "News",
      //         to: "docs/",
      //       },
      //       {
      //         label: "FAQ",
      //         to: "docs/",
      //       },
      //     ],
      //   },
      //   {
      //     items: [
      //       {
      //         html: `
      //           <div class="flexCentered_src-components-BottomSection-index-module subscribeContainer_src-components-BottomSection-index-module">
      //             <form class="mc__form">
      //               <div class="subscribeLabel_src-components-SubscribeForm-index-module">
      //                 Subscribe to our news
      //               </div>
      //               <div class="subscribeInputRow_src-components-SubscribeForm-index-module">
      //                 <div class="subscribeInputContainer_src-components-SubscribeForm-index-module">
      //                   <input type="email" placeholder="your@email.com" required="" class="subscribeInput_src-components-SubscribeForm-index-module" value="">
      //                 </div>
      //                 <div>
      //                   <input class="button button--outline button--primary subcribeButton_src-components-SubscribeForm-index-module" type="submit" disabled="" value="Subscribe">
      //                 </div>
      //               </div>
      //             </form>
      //             <div class="socialContainer_src-components-SociallSection-index-module">
      //               <div class="padding--sm">
      //                 <div class="flexCentered_src-components-SociallSection-index-module socialSvgContainer_src-components-SociallSection-index-module twitterLogoSocial_src-components-SociallSection-index-module">
      //                   <a href="https://twitter.com/FindoraOfficial" target="_blank" rel="noopener noreferrer" class="socialButton_src-components-SociallSection-index-module"></a>
      //                 </div>
      //               </div>
      //               <div class="padding--sm">
      //                 <div class="flexCentered_src-components-SociallSection-index-module socialSvgContainer_src-components-SociallSection-index-module telegramLogoSocial_src-components-SociallSection-index-module">
      //                   <a href="https://t.me/findoraen" target="_blank" rel="noopener noreferrer" class="socialButton_src-components-SociallSection-index-module"></a>
      //                 </div>
      //               </div>
      //               <div class="padding--sm">
      //                 <div class="flexCentered_src-components-SociallSection-index-module socialSvgContainer_src-components-SociallSection-index-module discordLogoSocial_src-components-SociallSection-index-module">
      //                   <a href="https://discord.com/invite/aPuyZd8mBJ" target="_blank" rel="noopener noreferrer" class="socialButton_src-components-SociallSection-index-module"></a>
      //                 </div>
      //               </div>
      //               <div class="padding--sm">
      //                 <div class="flexCentered_src-components-SociallSection-index-module socialSvgContainer_src-components-SociallSection-index-module mediumLogoSocial_src-components-SociallSection-index-module">
      //                   <a href="https://medium.com/findorafoundation" target="_blank" rel="noopener noreferrer" class="socialButton_src-components-SociallSection-index-module"></a>
      //                 </div>
      //               </div>
      //             </div>
      //           </div>
      //         `,
      //       },
      //     ],
      //   },
      //   // {
      //   //   title: "Community",
      //   //   items: [
      //   //     {
      //   //       label: "Stack Overflow",
      //   //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
      //   //     },
      //   //     {
      //   //       label: "Discord",
      //   //       href: "https://discordapp.com/invite/docusaurus",
      //   //     },
      //   //     {
      //   //       label: "Twitter",
      //   //       href: "https://twitter.com/docusaurus",
      //   //     },
      //   //     {
      //   //       html: `
      //   //           <a href="https://www.netlify.com" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Netlify">
      //   //             <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" width="114" height="51" />
      //   //           </a>
      //   //         `,
      //   //     },
      //   //   ],
      //   // },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} Findora. Built with Docusaurus.`,
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
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};
