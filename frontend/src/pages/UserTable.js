import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserTable() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [studentData, setStudentData] = useState([]);
  const [parentData, setParentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/student/student-table", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudentData(data.data);
        console.log(studentData);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/parent/parent-table", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setParentData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/teacher/teacher-table", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeacherData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <Helmet>
        <title> User Table | Guardian Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          User Table
        </Typography>
        <Card>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Student Table" {...a11yProps(0)} />
                <Tab label="Parent Table" {...a11yProps(1)} />
                <Tab label="Teacher Table" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student ID</TableCell>
                      <TableCell align="right">First Name</TableCell>
                      <TableCell align="right">Last Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Contact</TableCell>
                      <TableCell align="right">Gender</TableCell>
                      <TableCell align="right">Date of Birth</TableCell>
                      <TableCell align="right">Parent ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentData.map((student) => (
                      <TableRow
                        key={student.student_ID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {student.student_ID}
                        </TableCell>
                        <TableCell align="right">{student.firstName}</TableCell>
                        <TableCell align="right">{student.lastName}</TableCell>
                        <TableCell align="right">{student.email}</TableCell>
                        <TableCell align="right">{student.address}</TableCell>
                        <TableCell align="right">{student.contact}</TableCell>
                        <TableCell align="right">{student.gender}</TableCell>
                        <TableCell align="right">{student.dob}</TableCell>
                        <TableCell align="right">{student.parent_Id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Parent ID</TableCell>
                      <TableCell align="right">First Name</TableCell>
                      <TableCell align="right">Last Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Contact</TableCell>
                      <TableCell align="right">Relation</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {parentData.map((parent) => (
                      <TableRow
                        key={parent.parent_ID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {parent.parent_ID}
                        </TableCell>
                        <TableCell align="right">{parent.firstName}</TableCell>
                        <TableCell align="right">{parent.lastName}</TableCell>
                        <TableCell align="right">{parent.email}</TableCell>
                        <TableCell align="right">{parent.address}</TableCell>
                        <TableCell align="right">{parent.contact}</TableCell>
                        <TableCell align="right">{parent.relation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Teacher ID</TableCell>
                      <TableCell align="right">First Name</TableCell>
                      <TableCell align="right">Last Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Contact</TableCell>
                      <TableCell align="right">Department</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teacherData.map((teacher) => (
                      <TableRow
                        key={teacher.teacher_ID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {teacher.teacher_ID}
                        </TableCell>
                        <TableCell align="right">{teacher.firstName}</TableCell>
                        <TableCell align="right">{teacher.lastName}</TableCell>
                        <TableCell align="right">{teacher.email}</TableCell>
                        <TableCell align="right">{teacher.address}</TableCell>
                        <TableCell align="right">{teacher.contact}</TableCell>
                        <TableCell align="right">
                          {teacher.department}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Box>
        </Card>
      </Container>
    </>
  );
}
