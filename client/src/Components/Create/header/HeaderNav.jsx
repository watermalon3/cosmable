import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import "./nav.css";

export default function ButtonAppBar({ isHomePage }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: isHomePage
            ? "transparent"
            : "#fff",
          color: "#5A5252",
          borderBottom: "2px solid #5A5252",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3" component="div" sx={{ marginLeft: "0" }}>
            Cosmable
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ ml: 2, color: "#5A5252" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isHomePage
              ? [
                  <MenuItem key="about" onClick={handleClose}>
                    About
                  </MenuItem>,
                  <MenuItem key="contact" onClick={handleClose}>
                    Contact
                  </MenuItem>,
                ] : [
                  <MenuItem key="update" onClick={handleClose}>
                    Update profile
                  </MenuItem>,
                  <MenuItem key="notifications" onClick={handleClose}>
                    Notifications
                  </MenuItem>,
                  <MenuItem key="invite" onClick={handleClose}>
                    Invite friends
                  </MenuItem>,
                  <MenuItem key="password" onClick={handleClose}>
                    Password
                  </MenuItem>,
                  <MenuItem key="feedback" onClick={handleClose}>
                    Share Feedback
                  </MenuItem>,
                  <hr key="divider" />,
                  <MenuItem key="help" onClick={handleClose}>
                    Help
                  </MenuItem>,
                  <MenuItem key="about2" onClick={handleClose}>
                    About
                  </MenuItem>,
                ]}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
