import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

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
    Url: "https://medium.com/findorafoundation",
    buttonClassName: "mediumLogoSocial",
  },
  {
    Url: "https://discord.com/invite/aPuyZd8mBJ",
    buttonClassName: "discordLogoSocial",
  },
  {
    Url: "https://github.com/FindoraNetwork",
    buttonClassName: "githubLogoSocial",
  },
];

function SocialItem({ Url, buttonClassName }) {
  return (
    <div className={clsx(styles.socialItem)}>
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
    <div className={clsx(styles.socialContainer)}>
      {SocialList.map((props, idx) => (
        <SocialItem key={idx} {...props} />
      ))}
    </div>
  );
}

export default SubscribeSection;
