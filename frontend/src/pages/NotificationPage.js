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

export default function NotificationPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const form = useRef();

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
      form.current.reset();
    } catch (error) {
      console.error(error);
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
          <form ref={form}>
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
            Send
          </Button>
        </Card>
      </Container>
    </>
  );
}
