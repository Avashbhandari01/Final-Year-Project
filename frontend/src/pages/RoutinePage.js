import { Helmet } from "react-helmet-async";
import { Container, Typography } from "@mui/material";
import { filter } from "lodash";
import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Stack,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  // IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Routine_FILE_URL = "http://localhost:3000/Routine/ExcelRoutine.xlsx";

const TABLE_HEAD = [
  // { id: "Routine_ID", label: "Routine_ID", alignRight: false },
  { id: "Day", label: "Day", alignRight: false },
  { id: "Time", label: "Time", alignRight: false },
  { id: "Class_Type", label: "Class_Type", alignRight: false },
  { id: "Module_Code", label: "Module_Code", alignRight: false },
  { id: "Module_Title", label: "Module_Title", alignRight: false },
  { id: "Lecturer", label: "Lecturer", alignRight: false },
  { id: "Group", label: "Group", alignRight: false },
  { id: "Block", label: "Block", alignRight: false },
  { id: "Room", label: "Room", alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      // (_user) => _user.Group.toLowerCase().indexOf(query.toLowerCase()) !== -1
      (_user) => _user.Group.indexOf(query) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function RoutinePage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("Routine_ID");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [datas, setDatas] = useState([]);

  const isAdmin = window.localStorage.getItem("adminloggedIn");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = datas.map((n) => n.Day);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, Routine_ID) => {
    const selectedIndex = selected.indexOf(Routine_ID);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Routine_ID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;

  const filteredUsers = applySortFilter(
    datas,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  useEffect(() => {
    fetch("http://localhost:5000/api/routine/get-routine", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDatas(data);
        // console.log(datas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  // Upload File and Download File
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Save the uploaded file to local storage
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);
      fileReader.onload = () => {
        localStorage.setItem("uploadedFile", fileReader.result);
      };
    } else {
      toast.error("Please select a file to upload!");
    }
  };

  const handleDownload = () => {
    // Retrieve the uploaded file from local storage and download it
    const uploadedFile = localStorage.getItem("uploadedFile");
    const downloadLink = document.createElement("a");
    downloadLink.href = uploadedFile;
    downloadLink.download = selectedFile.name;
    downloadLink.click();
  };

  return (
    <>
      <Helmet>
        <title> Routine | Guardian Portal </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Routine
          </Typography>
          {!isAdmin && (
            <button
              onClick={() => {
                downloadFileAtURL(Routine_FILE_URL);
              }}
              className="btn btn-success"
              style={{ marginTop: 15 + "px" }}
            >
              Download Routine
            </button>
          )}
        </Stack>
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

        {isAdmin && (
          <Card style={{ padding: "20px", marginBottom: "30px" }}>
            <div>
              <h3>Upload Routine</h3>
              <br />
              <input
                type="file"
                onChange={handleFileInput}
                className="form-control"
              />
              <button
                onClick={handleUpload}
                className="btn btn-primary"
                style={{ marginTop: "15px" }}
              >
                Upload Routine
              </button>
              <button
                onClick={handleDownload}
                className="btn btn-success"
                style={{ marginTop: "15px", marginLeft: "15px" }}
              >
                Download Routine
              </button>
            </div>
          </Card>
        )}

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={datas.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        Routine_ID,
                        Day,
                        Time,
                        Class_Type,
                        Module_Code,
                        Module_Title,
                        Lecturer,
                        Group,
                        Block,
                        Room,
                      } = row;
                      const selectedUser = selected.indexOf(Routine_ID) !== -1;

                      return (
                        <TableRow
                          hover
                          key={Routine_ID}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, Day)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {Day}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{Time}</TableCell>

                          <TableCell align="left">{Class_Type}</TableCell>

                          <TableCell align="left">{Module_Code}</TableCell>

                          <TableCell align="left">{Module_Title}</TableCell>

                          <TableCell align="left">{Lecturer}</TableCell>

                          <TableCell align="left">{Group}</TableCell>

                          <TableCell align="left">{Block}</TableCell>

                          <TableCell align="left">{Room}</TableCell>
                        </TableRow>
                      );
                    })}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={datas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
