const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSMS = async (req, res) => {
  try {
    const client = twilio(accountSid, authToken);
    const { phoneNumber, message } = req.body;
    await client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
        body: message,
      })
      .then((message) => console.log(message.sid));
    res.send({ status: "SMS Sent!" });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  sendSMS,
};
