import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const admindata = window.localStorage.getItem("adminloggedIn");
  const studentdata = window.localStorage.getItem("StudentloggedIn");
  const parentdata = window.localStorage.getItem("ParentloggedIn");
  const teacherdata = window.localStorage.getItem("TeacherloggedIn");
  const isAdmin = JSON.parse(admindata);
  const isStudent = JSON.parse(studentdata);
  const isParent = JSON.parse(parentdata);
  const isTeacher = JSON.parse(teacherdata);

  let filteredData = data;

  if (isStudent) {
    filteredData = data.filter(
      (item) =>
        item.title !== "fee details" &&
        item.title !== "user table" &&
        item.title !== "register user" &&
        item.title !== "notification"
    );
  } else if (isParent) {
    filteredData = data.filter(
      (item) =>
        item.title !== "user table" &&
        item.title !== "register user" &&
        item.title !== "notification"
    );
  } else if (isTeacher) {
    filteredData = data.filter(
      (item) =>
        item.title !== "user table" &&
        item.title !== "register user" &&
        item.title !== "notification" &&
        item.title !== "fee details"
    );
  } else if (isAdmin) {
    filteredData = data.filter((item) => item.title !== "chat");
  }

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {filteredData.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
