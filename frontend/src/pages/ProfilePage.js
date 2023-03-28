import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Typography, Card } from "@mui/material";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import Image from "../layouts/dashboard/header/images/avatar.webp";

export default function ProfilePage() {
  const [studentData, setStudentData] = useState([]);
  const [parentData, setParentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  const isStudent = window.localStorage.getItem("StudentloggedIn");
  const isParent = window.localStorage.getItem("ParentloggedIn");
  const isAdmin = window.localStorage.getItem("adminloggedIn");
  const isTeacher = window.localStorage.getItem("TeacherloggedIn");

  useEffect(() => {
    const studentId = JSON.parse(window.localStorage.getItem("token"))?.data
      ?.student_ID;
    const parentID = JSON.parse(window.localStorage.getItem("token"))?.data
      ?.parent_ID;
    const teacherID = JSON.parse(window.localStorage.getItem("token"))?.data
      ?.teacher_ID;
    if (studentId) {
      fetch("http://localhost:5000/api/student/student-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          student_ID: studentId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setStudentData(data[0]);
          console.log(studentData.firstName);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (parentID) {
      fetch("http://localhost:5000/api/parent/parent-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          parent_ID: parentID,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setParentData(data[0]);
          console.log(parentData.firstName);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (teacherID) {
      fetch("http://localhost:5000/api/teacher/teacher-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          teacher_ID: teacherID,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTeacherData(data[0]);
          console.log(teacherData.firstName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Profile | Guardian Portal </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile
        </Typography>
        <Card>
          {isStudent && (
            <section style={{ backgroundColor: "#eee" }}>
              <MDBContainer className="py-4">
                <MDBRow>
                  <MDBCol lg="4">
                    <MDBCard className="mb-4">
                      <MDBCardBody className="text-center">
                        <MDBCardImage
                          src={Image}
                          alt="avatar"
                          className="rounded-circle mx-auto mb-3"
                          style={{ width: "180px" }}
                          fluid
                        />
                        <p className="text-muted mb-1">
                          {`${studentData.firstName} ${studentData.lastName}`}
                        </p>
                        <p className="text-muted mb-4">{studentData.email}</p>
                        <div className="d-flex justify-content-center mb-4">
                          Role: Student
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol lg="8">
                    <MDBCard className="mb-4">
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Address</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {studentData.address}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Contact</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {studentData.contact}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Date of Birth</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {studentData.dob}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Gender</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {studentData.gender}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Parent ID</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {studentData.parent_Id}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          )}
          {isParent && (
            <section style={{ backgroundColor: "#eee" }}>
              <MDBContainer className="py-4">
                <MDBRow>
                  <MDBCol lg="4">
                    <MDBCard className="mb-4">
                      <MDBCardBody className="text-center">
                        <MDBCardImage
                          src={Image}
                          alt="avatar"
                          className="rounded-circle mx-auto mb-3"
                          style={{ width: "180px" }}
                          fluid
                        />
                        <p className="text-muted mb-1">
                          {`${parentData.firstName} ${parentData.lastName}`}
                        </p>
                        <div className="d-flex justify-content-center mb-3">
                          Role: Parent
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol lg="8">
                    <MDBCard className="mb-4">
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Email</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {parentData.email}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Address</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {parentData.address}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Contact</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {parentData.contact}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Relation</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {parentData.relation}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          )}
          {isAdmin && (
            <section style={{ backgroundColor: "#eee" }}>
              <MDBContainer className="py-4">
                <MDBRow>
                  <MDBCol lg="4">
                    <MDBCard className="mb-4">
                      <MDBCardBody className="text-center">
                        <MDBCardImage
                          src={Image}
                          alt="avatar"
                          className="rounded-circle mx-auto mb-3"
                          style={{ width: "180px" }}
                          fluid
                        />
                        <p className="text-muted mb-1">Admin</p>
                        <p className="text-muted mb-4">admin@gmail.com</p>
                        <div className="d-flex justify-content-center mb-4">
                          Role: Admin
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol lg="8">
                    <MDBCard className="mb-4">
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Address</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              Golfutar
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Contact</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              9089907123
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Date of Birth</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              24/10/2000
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Gender</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              Male
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Department</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">IT</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          )}
          {isTeacher && (
            <section style={{ backgroundColor: "#eee" }}>
              <MDBContainer className="py-4">
                <MDBRow>
                  <MDBCol lg="4">
                    <MDBCard className="mb-4">
                      <MDBCardBody className="text-center">
                        <MDBCardImage
                          src={Image}
                          alt="avatar"
                          className="rounded-circle mx-auto mb-3"
                          style={{ width: "180px" }}
                          fluid
                        />
                        <p className="text-muted mb-1">{`${teacherData.firstName} ${teacherData.lastName}`}</p>
                        <div className="d-flex justify-content-center mb-4">
                          Role: Teacher
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol lg="8">
                    <MDBCard className="mb-4">
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Email</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {teacherData.email}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Address</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {teacherData.address}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Contact</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {teacherData.contact}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Department</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">
                              {teacherData.department}
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          )}
        </Card>
      </Container>
    </>
  );
}
