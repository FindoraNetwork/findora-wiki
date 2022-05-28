import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("1hero 1hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx(styles.welcomeTitle)}>
          {siteConfig.customFields.welcomeToDocs}
        </h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction/intro"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Learn, Build and Run on Findora Network - ${siteConfig.title}`}
      description="Learn, Build and Run on Findora Network - Findora Wiki"
    >
      {/* <HomepageHeader /> */}
      <main className={clsx(styles.mainContainer)}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
