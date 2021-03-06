import React, { useState, useEffect } from "react";
import clsx from "clsx";
import InputField from "../InputField/InputField";
const SubscribeImg =
  require("../../../static/img/landing/subscribe_button.svg").default;

import styles from "./index.module.css";

function SubscribeForm(props) {
  const { status, message, onValidated } = props;
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (status === "success") clearFields();
  }, [status]);

  const clearFields = () => {
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email", email);
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        MERGE0: email,
        MERGE6: "English",
      });
  };

  const mainTitle = status === "success" ? "" : "Subscribe to our news";

  return (
    <form className="mc__form" onSubmit={(e) => handleSubmit(e)}>
      <div className={clsx(styles.subscribeLabel)}>{mainTitle}</div>

      {status === "sending" && (
        <div className={clsx(styles.mcAlert, styles.mcSubscribeSending)}>
          Sending the request...
        </div>
      )}

      {status === "error" && (
        <div
          className={clsx(styles.mcAlert, styles.mcSubscribeError)}
          dangerouslySetInnerHTML={{ __html: `Error: ${message}` }}
        />
      )}

      {status === "success" && (
        <div
          className={clsx(styles.mcAlert, styles.mcSubscribeSuccess)}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}

      <div className={clsx(styles.subscribeInputRow)}>
        {status !== "success" ? (
          <div className={clsx(styles.subscribeInputContainer)}>
            <InputField
              onChangeHandler={setEmail}
              type="email"
              value={email}
              placeholder="Email Address"
              inputClassName={clsx(styles.subscribeInput)}
              isRequired
            />
            <InputField
              inputClassName={clsx(
                "button  button--primary",
                styles.subcribeButton
              )}
              type="imgButton"
              formValues={[email]}
              buttonImg={SubscribeImg}
              buttonImgClassName={clsx(styles.featureSvg)}
            />
          </div>
        ) : null}
      </div>
    </form>
  );
}

export default SubscribeForm;
