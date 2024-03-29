import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
import AvatarImg from "./images/avatar.webp";

export default function AccountPopover() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const admindata = window.localStorage.getItem("token");
  const obj = JSON.parse(admindata);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    setOpen(null);
    window.localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleHome = () => {
    setOpen(null);
    navigate("/dashboard/app");
  };

  const handleProfile = () => {
    setOpen(null);
    navigate("/dashboard/profile");
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={AvatarImg} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {obj?.data?.username
              ? obj.data.username
              : `${obj.data.firstName} ${obj.data.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {obj.data.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem icon="eva:home-fill" onClick={handleHome}>
            Home
          </MenuItem>
          <MenuItem icon="eva:person-fill" onClick={handleProfile}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Stack>
      </Popover>
    </>
  );
}
