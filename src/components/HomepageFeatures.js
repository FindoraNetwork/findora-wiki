import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import BottomSection from "../components/BottomSection";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Introduction",
    featureImg: require("../../static/img/landing/feature_learn.png").default,
    description: <>Learn the Findora architecture and key concepts</>,
    to: "/docs/introduction/intro",
  },
  {
    title: "Modules",
    featureImg: require("../../static/img/landing/feature_components.png")
      .default,
    description: <>Read in-depth info about key components</>,
    to: "docs/components/transfers/confidential/Overview",
  },
];

const SubFeatureList = [
  {
    title: "Use",
    featureImg: require("../../static/img/landing/feature_use_guide.png")
      .default,
    description: <>Use Findora dApps (bridges, wallets, etc.)</>,
    to: "docs/guides/get_fra/buy_fra",
  },
  {
    title: "Build",
    featureImg: require("../../static/img/landing/feature_build.png").default,
    description: <>Build with Findora SDK tools</>,
    to: "docs/developers/evm/web3",
  },
  {
    title: "Validate",
    featureImg: require("../../static/img/landing/feature_validate.png")
      .default,
    description: <>Setup a Findora validator</>,
    to: "/docs/validators/validators-get-started",
  },
];

function Feature({ featureImg, title, description, to }) {
  return (
    <div className={clsx("col col--6 padding--sm")}>
      <Link
        className={clsx("shadow--lw padding-vert--md", styles.featureCard)}
        to={to}
      >
        <div
          className={clsx(
            "text--center",
            styles.featureSvgContainer,
            styles.flexCentered
          )}
        >
          <img className={styles.featureSvg} src={featureImg} alt={title} />
        </div>
        <div className={clsx("padding-horiz--md", styles.infoContainer)}>
          <h3 className={clsx(styles.featureTitle)}>{title}</h3>
          <p className={clsx(styles.featureContent)}>{description}</p>
        </div>
      </Link>
    </div>
  );
}

function SubFeature({ featureImg, title, description, to }) {
  return (
    <div className={clsx("col col--4 padding--sm")}>
      <Link
        className={clsx(
          "shadow--lw padding-vert--md",
          styles.featureCard,
          styles.subFeatureCard
        )}
        to={to}
      >
        <div
          className={clsx(
            "text--center",
            styles.flexCentered,
            styles.subFeatureSvgContainer
          )}
        >
          <img className={styles.featureSvg} src={featureImg} alt={title} />
        </div>
        <div className={clsx("padding-horiz--md", styles.infoContainer)}>
          <h3 className={clsx(styles.subFeatureTitle)}>{title}</h3>
          <p className={clsx(styles.subFeatureContent)}>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <section className={styles.features}>
      <div className={clsx("container", styles.contentContainer)}>
        <div
          className={clsx(
            "row",
            styles.flexCentered,
            styles.welcomeTitleContainer
          )}
        >
          <h1 className={clsx("text--center", styles.welcomeTitle)}>
            {siteConfig.customFields.welcomeToDocs}
          </h1>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className="row">
          {SubFeatureList.map((props, idx) => (
            <SubFeature key={idx} {...props} />
          ))}
        </div>
        <div className={clsx("row", styles.flexCentered, styles.bottomRow)}>
          <BottomSection />
        </div>
      </div>
    </section>
  );
}
