import config from "config";
import sgMail from "@sendgrid/mail";

const mailConfig: {
  mailId: string
  password: string
  service: string,
  sendgridAPIKey: string,
} = config.get('mail');

sgMail.setApiKey(mailConfig.sendgridAPIKey);

export const sendMail = function (fromMailId: string, toMailId: string, subject: string, html: string = '') {

  if (!fromMailId || !toMailId) {
    console.error('ERROR while sending mail');
    if (!toMailId) console.error('Mail To Not Found - ', toMailId);
    else if (!toMailId) console.error('Mail From Not Found - ', toMailId);
    return true;
  }

  const msg = {
    to: toMailId, // should be email
    from: fromMailId, // should be object { name:'', email: '' }
    subject,
    html
  };

  try {
    console.log('--- sending mail ---');
    console.log(JSON.stringify(msg));

    return new Promise((res, rej) => {
      sgMail.send(msg)
        .then((data) => {
          console.log(data);
          console.log(`----- ${subject} MAIL SENT !-----`);
          console.log(`----- TO -> ${toMailId} -----`);
          return res(true);
        }).catch(err => {
          console.log(`----- ${subject} MAIL ERROR !-----`);
          console.log(err);
          return res(false);
        })
    });
  } catch (error) {
    console.log('sendMail function error');
    console.log(error);
  }
}
export default sendMail;
