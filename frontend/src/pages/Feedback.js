import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Card,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FeedbackPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Check if the textfields have values
    const formInputs = form.current.querySelectorAll("input, textarea");
    let isValid = true;
    let errorMessageDisplayed = false;
    formInputs.forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
        if (!errorMessageDisplayed) {
          errorMessageDisplayed = true;
          toast.error("Please fill out all the fields!");
        }
      }
      // Check email format
      else if (input.name === "user_email") {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
          toast.error("Please add valid email!");
        }
      }
      // Check contact format
      else if (input.name === "user_contact") {
        const contactRegex = /^\d{10}$/;
        if (!contactRegex.test(input.value)) {
          isValid = false;
          toast.error("Please add valid contact (10 digit number)!");
        }
      }
      // Check full name format
      else if (input.name === "user_name") {
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (!nameRegex.test(input.value)) {
          isValid = false;
          toast.error("Please add a valid full name!");
        }
      }
    });

    // Submit the form if the validation passes
    if (isValid) {
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
    }
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
        <Card style={{ padding: "20px", marginTop: "30px" }}>
          <h3>Get in touch with us.</h3>
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              name="user_name"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="user_email"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Contact"
              name="user_contact"
            />
            <TextareaAutosize
              name="user_message"
              aria-label="minimum height"
              minRows={3}
              placeholder="Enter a message..."
              style={{ width: "72.4vw", marginTop: "20px" }}
            />
            <Button
              variant="contained"
              style={{ marginTop: "2vw" }}
              // onClick={sendEmail}
              type="submit"
            >
              Submit
            </Button>
          </form>

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
