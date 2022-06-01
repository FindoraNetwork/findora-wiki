import React from "react";
import clsx from "clsx";
import Mailchimp from "../Mailchimp/Mailchimp";
import SociallSection from "../SociallSection";
import styles from "./index.module.css";

function BottomSection() {
  return (
    <div className={clsx(styles.flexCentered, styles.subscribeContainer)}>
      <Mailchimp />
      <SociallSection />
    </div>
  );
}

export default BottomSection;
