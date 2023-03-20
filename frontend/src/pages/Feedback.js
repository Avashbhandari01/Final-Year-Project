import { Helmet } from 'react-helmet-async';
import { Container, Typography, Card, TextField, TextareaAutosize, Button } from '@mui/material';
import emailjs from "@emailjs/browser";
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FeedbackPage() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ftzx74l",
        "template_35ukf43",
        form.current,
        "nC7bCdHmcMQODqdH1"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          form.current.reset();
          toast.success("Email sent successfully!");

        },
        (error) => {
          console.log(error.text);
          toast.error("Error sending email!");
        }
      );
  };

  return (
    <>
      <Helmet>
        <title> Feedback | Guardian Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Feedback
        </Typography>
        <Card style={{ padding: '20px', marginTop: '30px' }}>
          <h2>Get in touch with us.</h2>
          <form ref={form}>
            <TextField margin="normal" fullWidth label="Full Name" name="user_name" />
            <TextField margin="normal" fullWidth label="Email" name="user_email" />
            <TextField margin="normal" fullWidth label="Contact" name="user_contact" />
            <TextareaAutosize
              name="user_message"
              aria-label="minimum height"
              minRows={3}
              placeholder="Enter a message..."
              style={{ width: '72.4vw', marginTop: '20px' }}
            />

          </form>
          <Button variant="contained" style={{ marginTop: '2vw' }} onClick={sendEmail}>Submit</Button>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Card>
      </Container>
    </>
  );
}

