import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import BottomSection from "../../components/BottomSection";
import styles from "./index.module.css";

// import Footer from "@theme-original/Footer";

// function FooterWrapperO(props) {
//   return (
//     // <>
//     //   <section>
//     //     <h2>Extra section A</h2>
//     //     <p>This is an extra section that appears above the original footer</p>
//     //   </section>
//     <Footer {...props} />
//     // </>
//   );
// }

const copyrightLine = `© Findora ${new Date().getFullYear()}`;

const privacyPolicyUrl = "https://findora.org/privacy-policy/";
const termOfUseUrl = "https://findora.org/terms-of-use/";

const footerContentColumns = [
  {
    title: "Technology",
    columnStyle: styles.footerColumnTwo,
    items: [
      {
        label: "Findora OG",
        to: "https://findora.org/findora-og/",
      },
      {
        label: "FINDORA X",
        to: "https://findora.org/findora-x/",
      },
      {
        label: "FINDORA ZK",
        to: "https://findora.org/findora-zk/",
      },
      {
        label: "FINDORA CR",
        to: "https://findora.org/findora-cr/",
      },
    ],
  },
  {
    title: "Developers",
    columnStyle: styles.footerColumnThree,
    items: [
      {
        label: "Get Started",
        to: "https://findora.org/developer/",
      },
      {
        label: "Github",
        to: "https://github.com/FindoraNetwork",
      },
      {
        label: "Mainnet",
        to: "https://wiki.dev.findora.org/docs/network",
      },
      {
        label: "Testnet",
        to: "https://wiki.dev.findora.org/docs/network",
      },
      {
        label: "Technical Docs",
        to: "https://wiki.findora.org/docs/introduction/intro",
      },
      {
        label: "Whitepaper",
        to: "https://findora.org/wp-content/uploads/2020/12/Findora_Litepaper_3.2_Final_Clean.pdf",
      },
    ],
  },
  {
    title: "Use Findora",
    columnStyle: styles.footerColumnFour,
    items: [
      {
        label: "Wallet",
        to: "https://wallet.findora.org",
      },
      {
        label: "Native Chain Explorer",
        to: "https://findorascan.io",
      },
      {
        label: "Smart Chain Explorer",
        to: "https://evm.findorascan.io",
      },
      {
        label: "Bridge",
        to: "https://rialtobridge.io",
      },
    ],
  },
  {
    title: "General",
    columnStyle: styles.footerColumnFive,

    items: [
      {
        label: "About us",
        to: "https://findora.org/team/",
      },
      {
        label: "Staking",
        to: "docs/validators/staking-guide/",
      },
      {
        label: "Blog",
        to: "https://medium.com/findorafoundation",
      },
      {
        label: "Career",
        to: "https://boards.greenhouse.io/findora",
      },
      {
        label: "News",
        to: "https://medium.com/findorafoundation",
      },
      {
        label: "Tokenomic",
        to: "https://medium.com/findorafoundation/findora-network-tokenomics-921bea47cbfd",
      },
    ],
  },
];

function FooterColumn({
  title,
  items,
  columnStyle,
  columnClassOverwrite = "",
}) {
  return (
    <div
      className={clsx(
        " col col--2 ",
        styles.footerColumn,
        columnStyle,
        columnClassOverwrite
      )}
    >
      <div className={clsx(styles.columnTitle)}>{title}</div>
      <div className={clsx(styles.columnContent)}>
        {items.map((item) => {
          const { label, to } = item;
          return (
            <Link
              className={clsx(
                "shadow--lw padding-vert--md",
                styles.columnItemLink
              )}
              to={to}
            >
              <div className={clsx(styles.columnItemLabel)}>{label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function FooterWrapper(props) {
  return (
    <>
      <section className={clsx(styles.footerSection)}>
        <div className={clsx("container", styles.container)}>
          <div className={clsx("row")}>
            <div
              className={clsx(
                "col col--4 ",
                styles.footerColumn,
                styles.footerColumnOne
              )}
            >
              <BottomSection />
            </div>

            {footerContentColumns.map((footerColumn) =>
              FooterColumn(footerColumn)
            )}
          </div>
        </div>
      </section>
      <section className={clsx(styles.footerSection)}>
        <div className={clsx("row")}>
          <div className={clsx(styles.footerCopyright)}>
            <div className={clsx(styles.footerCopyrightLabel)}>
              {copyrightLine}
            </div>
            <div
              className={clsx(
                styles.footerCopyrightLabel,
                styles.footerCopyrightDivider
              )}
            >
              |
            </div>
            <div className={clsx(styles.footerCopyrightLabel)}>
              <Link className={clsx(styles.footerLink)} to={privacyPolicyUrl}>
                Privacy Policy
              </Link>
            </div>
            <div
              className={clsx(
                styles.footerCopyrightLabel,
                styles.footerCopyrightDivider
              )}
            >
              |
            </div>
            <div className={clsx(styles.footerCopyrightLabel)}>
              <Link className={clsx(styles.footerLink)} to={termOfUseUrl}>
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
        <section>
          <p>&nbsp;</p>
        </section>
      </section>
    </>
  );
}

export default FooterWrapper;
