import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import "./nav.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

export default function ButtonAppBar({ isHomePage }) {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    console.log("Logged out");
  };

  const navigate = useNavigate();

  const handleClicked = () => {
    navigate("/");
  };

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
          zIndex: 999,
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#fff",
          color: "black",
          borderBottom: "2px solid #5A5252",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <nav>
            <Button onClick={handleClicked} sx={{ color: "black" }}>
              <Typography
                variant="h3"
                component="div"
                sx={{ marginLeft: "0", fontFamily: "Playfair Display" }}
              >
                Cosmable
              </Typography>
            </Button>
          </nav>
          <Box>
            {isLoggedIn ? (
              <Link key="logout-link" to="/">
                <Button
                  key="logout-button"
                  variant="outlined"
                  edge="end"
                  sx={{
                    color: "black",
                    borderColor: "transparent",
                    fontFamily: "Playfair Display",
                    marginRight: "16px",
                    fontWeight: "bold",
                    ":hover": {
                      bgcolor: "#5A5252",
                      color: "white",
                    },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            ) : (
              <Link key="login-link" to="/home-login">
                <Button
                  key="login-button"
                  variant="outlined"
                  edge="end"
                  sx={{
                    color: "black",
                    borderColor: "transparent",
                    fontFamily: "Playfair Display",
                    marginRight: "16px",
                    fontWeight: "bold",
                    ":hover": {
                      bgcolor: "#5A5252",
                      color: "white",
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ ml: 2, color: "Black" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
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
                  <MenuItem
                    key="about"
                    onClick={handleClose}
                    sx={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    About
                  </MenuItem>,
                  <MenuItem
                    key="contact"
                    onClick={handleClose}
                    sx={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    Contact
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    key="update"
                    onClick={handleClose}
                    sx={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    Update profile
                  </MenuItem>,
                  <MenuItem
                    key="notifications"
                    onClick={handleClose}
                    sx={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    Notifications
                  </MenuItem>,
                  <MenuItem
                    key="invite"
                    onClick={handleClose}
                    sx={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    Invite friends
                  </MenuItem>,
                  <MenuItem
                    key="password"
                    onClick={handleClose}
                    sx={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    Password
                  </MenuItem>,
                  <MenuItem
                    key="feedback"
                    onClick={handleClose}
                    sx={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    Share Feedback
                  </MenuItem>,
                  <hr key="divider" />,
                  <MenuItem
                    key="help"
                    onClick={handleClose}
                    sx={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    Help
                  </MenuItem>,
                  <MenuItem
                    key="about2"
                    onClick={handleClose}
                    sx={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    About
                  </MenuItem>,
                ]}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
