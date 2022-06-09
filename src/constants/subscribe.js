export const mailChimpUserId = process.env.REACT_APP_MAILCHIMP_U;
export const mailChimpId = process.env.REACT_APP_MAILCHIMP_ID;
export const mailChimpUrl = process.env.REACT_APP_MAILCHIMP_URL;

// export const mailChimpPostUrl = `https://gmail.us12.list-manage.com/subscribe/post?u=${mailChimpUserId}&id=${mailChimpId}`;

export const mailChimpPostUrl = `${mailChimpUrl}?u=${mailChimpUserId}&id=${mailChimpId}`;
