import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/dashboard/DashboardLayout'

const AdminDashboard = () => {
  const [adminData, setadminData] = useState("");

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./admin-login"
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/adminData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token")
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "adminData")
        setadminData(data.data);
        if (data.data == 'token expired') {
          // alert("Token expired login again!")
          window.localStorage.clear();
          window.location.href = "./admin-login"
        }
      });
  }, []);

  return (
    <div>
      {/* <h1>Name: {adminData.username}</h1>
      <h1>Email: {adminData.email}</h1><br />
      <button onClick={logOut} className='btn btn-primary'>Log Out</button> */}
    </div>
  );
}

export default AdminDashboard;