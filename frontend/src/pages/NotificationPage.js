import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Card,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function NotificationPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const smsform = useRef();
  const emailform = useRef();

  const sendSMS = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/sms/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, message }),
      });
      const result = await response.json();
      console.log(result);
      smsform.current.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      emailjs
        .sendForm(
          "service_ftzx74l",
          "template_j8pmfzc",
          emailform.current,
          "nC7bCdHmcMQODqdH1"
        )
        .then(
          (result) => {
            console.log(result.text);
            console.log("message sent");
            emailform.current.reset();
          },
          (error) => {
            console.log(error.text);
          }
        );
    } catch (error) {
      console.log(error.text);
    }
  };

  return (
    <>
      <Helmet>
        <title> Notification | Guardian Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Notification
        </Typography>
        <Card style={{ padding: "20px", marginBottom: "30px" }}>
          <h3>Send SMS</h3>
          <form ref={smsform}>
            <TextField
              margin="normal"
              fullWidth
              label="Enter phone number..."
              name="phoneNumber"
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
            <TextareaAutosize
              name="message"
              aria-label="minimum height"
              minRows={3}
              placeholder="Enter a message..."
              style={{ width: "72.4vw", marginTop: "20px" }}
              onChange={(event) => setMessage(event.target.value)}
            />
          </form>
          <Button
            variant="contained"
            style={{ marginTop: "2vw" }}
            onClick={sendSMS}
          >
            Send SMS
          </Button>
        </Card>

        <Card style={{ padding: "20px", marginBottom: "30px" }}>
          <h3>Send Email</h3>
          <form ref={emailform}>
            <TextField
              margin="normal"
              fullWidth
              label="Enter email..."
              name="user_email"
            />
            <TextareaAutosize
              name="user_message"
              aria-label="minimum height"
              minRows={3}
              placeholder="Enter a message..."
              style={{ width: "72.4vw", marginTop: "20px" }}
            />
          </form>
          <Button
            variant="contained"
            style={{ marginTop: "2vw" }}
            onClick={sendEmail}
          >
            Send Email
          </Button>
        </Card>
      </Container>
    </>
  );
}
