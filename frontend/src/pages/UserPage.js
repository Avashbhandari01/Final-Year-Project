import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Container,
  Stack,
  Typography,
  Card,
  TextField,
  Box,
} from "@mui/material";
import Iconify from "../components/iconify";

export default function UserPage() {
  // Use States for parent form
  const [parentfirstName, setParentFirstname] = useState("");
  const [parentlastName, setParentLastname] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [parentAddress, setParentAddress] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [parentRelation, setParentRelation] = useState("");

  // Use States for student form
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDateofbirth] = useState("");
  const [group, setGroup] = useState("");

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/users/user-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        parentfirstName,
        parentlastName,
        parentEmail,
        parentPassword,
        parentAddress,
        parentContact,
        parentRelation,
        firstName,
        lastName,
        email,
        password,
        address,
        contact,
        gender,
        dob,
        group,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "User Registered!");
        // window.location.reload()
      });
  };

  return (
    <>
      <Helmet>
        <title> User | Guardian Portal </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Register User
          </Typography>
        </Stack>

        <Card style={{ padding: "20px", marginBottom: "30px" }}>
          <h3>Register Parent Form</h3>
          <Box
            component="form"
            noValidate
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
          >
            <TextField
              margin="normal"
              // required
              fullWidth
              id="PfirstName"
              label="First Name"
              name="PfirstName"
              // autoComplete="First Name"
              autoFocus
              onChange={(e) => setParentFirstname(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="PlastName"
              label="Last Name"
              name="PlastName"
              autoFocus
              onChange={(e) => setParentLastname(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Pemail"
              label="Email"
              name="Pemail"
              autoFocus
              onChange={(e) => setParentEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Ppassword"
              label="Password"
              name="Ppassword"
              type="password"
              autoFocus
              onChange={(e) => setParentPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Paddress"
              label="Address"
              name="Paddress"
              autoFocus
              onChange={(e) => setParentAddress(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Pcontact"
              label="Contact"
              name="Pcontact"
              autoFocus
              onChange={(e) => setParentContact(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Prelation"
              label="Relation"
              name="Prelation"
              autoFocus
              onChange={(e) => setParentRelation(e.target.value)}
            />
          </Box>
        </Card>

        <Card style={{ padding: "20px" }}>
          <h3>Register Student Form</h3>
          <Box
            component="form"
            noValidate
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
          >
            <TextField
              margin="normal"
              // required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              // autoComplete="First Name"
              autoFocus
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoFocus
              onChange={(e) => setLastname(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoFocus
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="contact"
              label="Contact"
              name="contact"
              autoFocus
              onChange={(e) => setContact(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoFocus
              onChange={(e) => setGender(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="dateofbirth"
              label="Date Of Birth"
              name="dateofbirth"
              autoFocus
              onChange={(e) => setDateofbirth(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="group"
              label="Group"
              name="group"
              autoFocus
              onChange={(e) => setGroup(e.target.value)}
            />
          </Box>
        </Card>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          style={{ marginTop: "2vw" }}
          onClick={handleSubmit}
        >
          Register User
        </Button>
      </Container>
    </>
  );
}
