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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // Use States for teacher form
  const [teacherfirstName, setTeacherFirstname] = useState("");
  const [teacherlastName, setTeacherLastname] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherAddress, setTeacherAddress] = useState("");
  const [teacherContact, setTeacherContact] = useState("");
  const [teacherDepartment, setTeacherDepartment] = useState("");

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !parentfirstName ||
      !parentlastName ||
      !parentEmail ||
      !parentPassword ||
      !parentAddress ||
      !parentContact ||
      !parentRelation ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !address ||
      !contact ||
      !gender ||
      !dob ||
      !group
    ) {
      toast.error("Please fill all the text fields!");
      return;
    }

    // regex to validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(parentEmail) || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!parentContact.match(/^\d{10}$/) || !contact.match(/^\d{10}$/)) {
      toast.error("Enter a valid contact number!");
      return;
    }

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
        toast.success("User Registered!");
        // window.location.reload()
      });
  };

  // Handle Teacher Submit
  const handleTeacherSubmit = (e) => {
    e.preventDefault();

    // regex to validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (
      !teacherfirstName ||
      !teacherlastName ||
      !teacherEmail ||
      !teacherPassword ||
      !teacherAddress ||
      !teacherContact ||
      !teacherDepartment
    ) {
      toast.error("Please input all the textfields!");
      return;
    }

    if (!teacherContact.match(/^\d{10}$/)) {
      toast.error("Enter a valid contact number!");
      return;
    }

    if (!emailRegex.test(teacherEmail)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    fetch("http://localhost:5000/api/teacher/teacher-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        firstName: teacherfirstName,
        lastName: teacherlastName,
        email: teacherEmail,
        password: teacherPassword,
        address: teacherAddress,
        contact: teacherContact,
        department: teacherDepartment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Teacher Registered!");
        toast.success("Teacher registered!");
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

        <Card style={{ padding: "20px", marginTop: "30px" }}>
          <h3>Register Teacher Form</h3>
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
              id="TfirstName"
              label="First Name"
              name="TfirstName"
              // autoComplete="First Name"
              autoFocus
              onChange={(e) => setTeacherFirstname(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="TlastName"
              label="Last Name"
              name="TlastName"
              autoFocus
              onChange={(e) => setTeacherLastname(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Temail"
              label="Email"
              name="Temail"
              autoFocus
              onChange={(e) => setTeacherEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Tpassword"
              label="Password"
              name="Tpassword"
              type="password"
              autoFocus
              onChange={(e) => setTeacherPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Taddress"
              label="Address"
              name="Taddress"
              autoFocus
              onChange={(e) => setTeacherAddress(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Tcontact"
              label="Contact"
              name="Tcontact"
              autoFocus
              onChange={(e) => setTeacherContact(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="Tdepartment"
              label="Department"
              name="Tdepartment"
              autoFocus
              onChange={(e) => setTeacherDepartment(e.target.value)}
            />
          </Box>
        </Card>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          style={{ marginTop: "2vw" }}
          onClick={handleTeacherSubmit}
        >
          Register Teacher
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
    </>
  );
}
