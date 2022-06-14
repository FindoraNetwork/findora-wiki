import React from "react";
import clsx from "clsx";
import Mailchimp from "../Mailchimp/Mailchimp";
import SociallSection from "../SociallSection";
import styles from "./index.module.css";

const LogoImg = require("../../../static/img/logo-findora.svg").default;

function BottomSection() {
  return (
    <div className={clsx(styles.subscribeContainer)}>
      <div className={clsx(styles.subscribeTitleContainer)}>
        <div className={clsx(styles.featureSvgContainer)}>
          <LogoImg className={clsx(styles.featureSvg)} alt={""} />
        </div>
        <div className={clsx(styles.subscribeTitle)}>Findora</div>
      </div>
      <SociallSection />
      <Mailchimp />
    </div>
  );
}

export default BottomSection;
