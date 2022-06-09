import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import SubscribeForm from "../SubscribeForm";
import { mailChimpPostUrl } from "../../constants/subscribe";

const MailchimpFormContainer = (props) => {
  const postUrl = mailChimpPostUrl;

  return (
    <MailchimpSubscribe
      url={postUrl}
      render={({ subscribe, status, message }) => (
        <SubscribeForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
};

export default MailchimpFormContainer;
