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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isValidPhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^\+977\d{10}$/;
  return phoneNumberRegex.test(phoneNumber);
};

export default function NotificationPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const smsform = useRef();
  const emailform = useRef();

  const sendSMS = async (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error(
        "Invalid phone number. Also add +977 in the front of the phone number!"
      );
      return;
    }
    if (!message) {
      toast.error("Please fill message textfield!");
    }
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
      toast.success("Message Sent!");
      smsform.current.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const emailRegex = /\S+@\S+\.\S+/; // Regular expression to match email format
      if (emailRegex.test(email)) {
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
              toast.success("Message Sent!");
              emailform.current.reset();
            },
            (error) => {
              console.log(error.text);
            }
          );
      } else {
        toast.error("Invalid email format!");
      }
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
              onChange={(event) => setEmail(event.target.value)}
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
          <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            limit={1}
          />
        </Card>
      </Container>
    </>
  );
}
