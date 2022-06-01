import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import BottomSection from "../components/BottomSection";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Learn",
    Svg: require("../../static/img/landing/feature_learn.svg").default,
    description: <>Learn the Findora architecture and key concepts</>,
    to: "/docs/introduction/intro",
  },
  {
    title: "Build",
    Svg: require("../../static/img/landing/feature_build.svg").default,
    description: <>Build with Findora SDK tools</>,
    to: "/docs/developers/developers-get-started",
  },
];

const SubFeatureList = [
  {
    title: "Use",
    Svg: require("../../static/img/landing/feature_use_guide.svg").default,
    description: <>Use Findora dApps (bridges, wallets, etc.)</>,
    to: "docs/guides/use-get-started",
  },
  {
    title: "Components",
    Svg: require("../../static/img/landing/feature_components.svg").default,
    description: <>Read in-depth info about key components</>,
    to: "docs/Introduction/components/components-overview",
  },
  {
    title: "Validate",
    Svg: require("../../static/img/landing/feature_validate.svg").default,
    description: <>Setup a Findora validator</>,
    to: "/docs/validators/validators-get-started",
  },
];

function Feature({ Svg, title, description, to }) {
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
          <Svg className={styles.featureSvg} alt={title} />
        </div>
        <div className={clsx("padding-horiz--md", styles.infoContainer)}>
          <h3 className={clsx(styles.featureTitle)}>{title}</h3>
          <p className={clsx(styles.featureContent)}>{description}</p>
        </div>
      </Link>
    </div>
  );
}

function SubFeature({ Svg, title, description, to }) {
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
          <Svg className={styles.subFeatureSvg} alt={title} />
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
