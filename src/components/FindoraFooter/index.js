import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import BottomSection from "../../components/BottomSection";
import styles from "./index.module.css";

// import Footer from "@theme-original/Footer";

// export default function FooterWrapper(props) {
//   return (
//     <>
//       <section>
//         <h2>Extra section A</h2>
//         <p>This is an extra section that appears above the original footer</p>
//       </section>
//       {/* <Footer {...props} /> */}
//       <section>
//         <h2>Extra section B</h2>
//         <p>This is an extra section that appears below the original footer</p>
//       </section>
//     </>
//   );
// }

const footerContentColumns = [
  {
    title: "Technology",
    columnStyle: styles.footerColumnTwo,
    items: [
      {
        label: "Findora OG",
        to: "docs/",
      },
      {
        label: "FINDORA X",
        to: "docs/",
      },
      {
        label: "FINDORA ZK",
        to: "docs/",
      },
      {
        label: "FINDORA CR",
        to: "docs/",
      },
    ],
  },
  {
    title: "Developers",
    columnStyle: styles.footerColumnThree,
    // columnClassOverwrite: " col--3 ",
    items: [
      {
        label: "Get Started",
        to: "docs/",
      },
      {
        label: "Github",
        to: "docs/",
      },
      {
        label: "Mainnet",
        to: "docs/",
      },
      {
        label: "Testnet",
        to: "docs/",
      },
      {
        label: "Technical documentation",
        to: "docs/",
      },
      {
        label: "Whitepaper",
        to: "docs/",
      },
    ],
  },
  {
    title: "Use Findora",
    columnStyle: styles.footerColumnFour,

    items: [
      {
        label: "Wallet",
        to: "docs/",
      },
      {
        label: "Native Chain Explorer",
        to: "docs/",
      },
      {
        label: "Smart Chain Explorer",
        to: "docs/",
      },
      {
        label: "Bridge",
        to: "docs/",
      },
    ],
  },
  {
    title: "General",
    columnStyle: styles.footerColumnFive,

    items: [
      {
        label: "About us",
        to: "docs/",
      },
      {
        label: "Staking",
        to: "docs/",
      },
      {
        label: "Blog",
        to: "docs/",
      },
      {
        label: "Career",
        to: "docs/",
      },
      {
        label: "News",
        to: "docs/",
      },
      {
        label: "FAQ",
        to: "docs/",
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
      <section>
        <p>&nbsp;</p>
      </section>
    </>
  );
}

export default FooterWrapper;
