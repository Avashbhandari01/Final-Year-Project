import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Grid,
  TableHead,
  TableRow,
  TableCell,
  Card,
  Table,
  TableContainer,
  Paper,
  TableBody,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AppWidgetSummary } from "../sections/@dashboard/app";
import { useEffect, useState } from "react";
import { Card as AntdCard } from "antd";

export default function DashboardAppPage() {
  const theme = useTheme();
  const [parentCount, setParentCount] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [teacherCount, setTeacherCount] = useState("");
  const [adminCount, setAdminCount] = useState("");
  const [attendance, setAttendance] = useState([]);

  const isAdmin = window.localStorage.getItem("adminloggedIn");
  const isTeacher = window.localStorage.getItem("TeacherloggedIn");
  const isParent = window.localStorage.getItem("ParentloggedIn");
  const isStudent = window.localStorage.getItem("StudentloggedIn");

  useEffect(() => {
    fetch("http://localhost:5000/api/parent/parent-count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setParentCount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/student/student-count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudentCount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/teacher/teacher-count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeacherCount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/admin-count", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminCount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/attendance/full-attendance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAttendance(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | Guardian Portal </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        {(isStudent || isParent) && (
          <AntdCard
            title={
              <span style={{ fontSize: "1.5em" }}>Guardian Portal System</span>
            }
            bordered={true}
            style={{ width: 1000 }}
          >
            <p style={{ fontSize: "1.2em", textAlign: "justify" }}>
              The Guardian Portal System is an online communication system that
              enables parents to monitor their child's progress in school,
              including their marks, attendance, teacher remarks, and exam
              results. It offers several features such as a calendar displaying
              the school's academic calendar and events, a notification system,
              a chat function for communicating with teachers, attendance
              tracking, assignment completion tracking, fee detail tracking, a
              profile section for overall student details and progress, and
              login authentication.
            </p>
          </AntdCard>
        )}
        {(isAdmin || isTeacher) && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Students" total={studentCount} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Parents"
                total={parentCount}
                color="info"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Teachers"
                total={teacherCount}
                color="warning"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Admin"
                total={adminCount}
                color="error"
              />
            </Grid>
          </Grid>
        )}
        {(isAdmin || isTeacher) && (
          <Card style={{ padding: "20px", marginTop: "30px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Month</TableCell>
                    <TableCell align="right">Year</TableCell>
                    <TableCell align="right">Days Present</TableCell>
                    <TableCell align="right">Attendance Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendance.map((attend) => (
                    <TableRow
                      key={attend.attendance_ID}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{attend.firstName}</TableCell>
                      <TableCell align="right">{attend.lastName}</TableCell>
                      <TableCell align="right">{attend.month}</TableCell>
                      <TableCell align="right">{attend.year}</TableCell>
                      <TableCell align="right">{attend.daysPresent}</TableCell>
                      <TableCell align="right">
                        {attend.attendancePercentage}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}
      </Container>
    </>
  );
}
