import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";

import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Introduction",
    Svg: require("../../static/img/landing/feature_learn.svg").default,
    description: <>Learn the Findora architecture and key concepts</>,
    to: "/docs/introduction/intro",
  },
  {
    title: "Modules",
    Svg: require("../../static/img/landing/feature_components.svg").default,
    description: <>Read in-depth info about key components</>,
    to: "docs/components/transfers/confidential/Overview",
  },
];

const SubFeatureList = [
  {
    title: "Use",
    Svg: require("../../static/img/landing/feature_use_guide.svg").default,
    description: <>Use Findora dApps (bridges, wallets, etc.)</>,
    to: "docs/guides/get_fra/buy_fra",
  },
  {
    title: "Build",
    Svg: require("../../static/img/landing/feature_build.svg").default,
    description: <>Build with Findora SDK tools</>,
    to: "docs/developers/evm/web3",
  },
  {
    title: "Validate",
    Svg: require("../../static/img/landing/feature_validate.svg").default,
    description: <>Setup a Findora validator</>,
    to: "/docs/validators/validators-get-started",
  },
];

const SocialList = [
  {
    Url: "https://twitter.com/FindoraOfficial",
    buttonClassName: "twitterLogoSocial",
  },
  {
    Url: "https://t.me/findoraen",
    buttonClassName: "telegramLogoSocial",
  },
  {
    Url: "https://discord.com/invite/aPuyZd8mBJ",
    buttonClassName: "discordLogoSocial",
  },
  {
    Url: "https://medium.com/findorafoundation",
    buttonClassName: "mediumLogoSocial",
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

function SocialItem({ Svg, Url, buttonClassName }) {
  return (
    <div className={clsx("padding--sm")}>
      <div
        className={clsx(
          styles.flexCentered,
          styles.socialSvgContainer,
          styles[buttonClassName]
        )}
      >
        <Link className={clsx(styles.socialButton)} to={Url}></Link>
      </div>
    </div>
  );
}

function SubscribeSection() {
  return (
    <div className={clsx(styles.flexCentered, styles.subscribeContainer)}>
      <div className={clsx(styles.subscribeLabel)}>Subscribe to our news</div>
      <div className={clsx(styles.subscribeInputRow)}>
        <div className={clsx(styles.subscribeInputContainer)}>
          <input className={clsx(styles.subscribeInput)} />
        </div>
        <div>
          <button
            className={clsx(
              "button button--outline button--primary",
              styles.subcribeButton
            )}
          >
            Subscribe
          </button>
        </div>
      </div>
      <div className={clsx(styles.socialContainer)}>
        {SocialList.map((props, idx) => (
          <SocialItem key={idx} {...props} />
        ))}
      </div>
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
          <SubscribeSection />
        </div>
      </div>
    </section>
  );
}
