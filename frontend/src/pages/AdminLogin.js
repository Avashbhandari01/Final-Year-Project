import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email and password fields are not empty
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Please enter email and password");
      return;
    }

    // Check if email is in valid format
    const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    fetch("http://localhost:5000/api/admin/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          window.localStorage.setItem("token", JSON.stringify(data));
          window.localStorage.setItem("adminloggedIn", true);
          window.location.href = "./dashboard/app";
        } else {
          toast.error(data.error);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#666666" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login as a Admin User
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 8, mb: 4 }}
        >
          {"Copyright © "}
          <Link color="inherit" href="/">
            Guardian Portal System
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        <Button
          to="/"
          size="large"
          variant="contained"
          component={RouterLink}
          style={{ marginLeft: "7.6vw" }}
        >
          Go to Home
        </Button>
        <ToastContainer
          position="top-center"
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
      </Container>
    </ThemeProvider>
  );
}
