import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Card,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function FeeDetailsPage() {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [feeData, setFeeData] = useState([]);
  const [allfee, setAllfee] = useState([]);

  const isAdmin = window.localStorage.getItem("adminloggedIn");

  const yearStyle = {
    marginTop: "15px",
    marginBottom: "5px",
    marginRight: "20px",
    width: "40%",
  };

  const monthStyle = {
    marginTop: "15px",
    marginBottom: "5px",
    width: "40%",
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === undefined) {
      setYear("");
    } else {
      setYear(value);
      console.log(year);
    }
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    if (value === undefined) {
      setMonth("");
    } else {
      setMonth(value);
      console.log(month);
    }
  };

  useEffect(() => {
    const studentId = JSON.parse(window.localStorage.getItem("token"))?.data
      ?.student_ID;
    const parentID = JSON.parse(window.localStorage.getItem("token"))?.data
      ?.parent_ID;
    if (studentId) {
      fetch("http://localhost:5000/api/fee/get-fee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          student_ID: studentId,
          year: year,
          month: month,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          if (Array.isArray(data.data)) {
            setFeeData(data.data);
            // console.log(feeData);
          } else {
            setFeeData([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (parentID) {
      fetch("http://localhost:5000/api/fee/parent-fee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          parent_ID: parentID,
          year: year,
          month: month,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          if (Array.isArray(data.data)) {
            setFeeData(data.data);
            // console.log(feeData);
          } else {
            setFeeData([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch("http://localhost:5000/api/fee/all-fee", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setAllfee(data);
          // console.log(allfee);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [month, year]);

  return (
    <>
      <Helmet>
        <title> Fee Details | Guardian Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Fee Details
        </Typography>
        {!isAdmin && (
          <Card style={{ padding: "20px", marginBottom: "30px" }}>
            <FormControl style={yearStyle}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="year"
                value={year || ""} // check for undefined before setting value
                onChange={handleYearChange} // use handleRoleChange to set value
              >
                <MenuItem value={""}>-- Select Year --</MenuItem>
                <MenuItem value={"2023"}>2023</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={monthStyle}>
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="month"
                value={month || ""} // check for undefined before setting value
                onChange={handleMonthChange} // use handleRoleChange to set value
              >
                <MenuItem value={""}>-- Select Month --</MenuItem>
                <MenuItem value={"January"}>January</MenuItem>
                <MenuItem value={"February"}>February</MenuItem>
                <MenuItem value={"March"}>March</MenuItem>
                <MenuItem value={"April"}>April</MenuItem>
                <MenuItem value={"May"}>May</MenuItem>
                <MenuItem value={"June"}>June</MenuItem>
                <MenuItem value={"July"}>July</MenuItem>
                <MenuItem value={"August"}>August</MenuItem>
                <MenuItem value={"September"}>September</MenuItem>
                <MenuItem value={"October"}>October</MenuItem>
                <MenuItem value={"November"}>November</MenuItem>
                <MenuItem value={"December"}>December</MenuItem>
              </Select>
            </FormControl>
            <Card style={{ padding: "20px", marginTop: "30px" }}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {feeData && feeData.length ? (
                    <>
                      {feeData.map((fee) => (
                        <tr key={fee.student_ID}>
                          <td>{fee.firstName}</td>
                          <td>{fee.lastName}</td>
                          <td>{fee.email}</td>
                          <td>{fee.contact}</td>
                          <td>{fee.month}</td>
                          <td>{fee.year}</td>
                          <td>Rs {fee.total}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td>No Data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card>
          </Card>
        )}

        {isAdmin && (
          <Card style={{ padding: "20px", marginBottom: "30px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Fee ID</TableCell>
                    <TableCell align="right">Month</TableCell>
                    <TableCell align="right">Year</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Student Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allfee.map((fee) => (
                    <TableRow
                      key={fee.fee_ID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {fee.fee_ID}
                      </TableCell>
                      <TableCell align="right">{fee.month}</TableCell>
                      <TableCell align="right">{fee.year}</TableCell>
                      <TableCell align="right">Rs {fee.total}</TableCell>
                      <TableCell align="right">
                        {fee.Student.firstName}
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
