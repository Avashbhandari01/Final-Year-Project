const express = require("express");
const dotenv = require("dotenv").config();
require("./dbconfig/dbConfig");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT;

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/parent", require("./routes/parentRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/fee", require("./routes/feeRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/assignment", require("./routes/assignmentRoutes"));
app.use("/api/routine", require("./routes/routineRoute"));
app.use("/api/teacher", require("./routes/teacherRoutes"));
app.use("/api/sms", require("./routes/smsRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
