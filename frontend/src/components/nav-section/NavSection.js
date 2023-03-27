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
  const isAdmin = JSON.parse(admindata);
  const isStudent = JSON.parse(studentdata);

  // If adminloggedIn is false, don't show the "user" NavItem
  const filteredData =
    isAdmin === true
      ? data
      : isStudent === true
      ? data.filter(
          (item) =>
            item.title !== "fee details" &&
            item.title !== "user table" &&
            item.title !== "register user"
        )
      : data.filter(
          (item) =>
            item.title !== "register user" && item.title !== "user table"
        );
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
