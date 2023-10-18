import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Tabs,
  Stack,
  Tab,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import LocalMoviesSharpIcon from "@mui/icons-material/LocalMoviesSharp";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userActions } from "../Store";
import Cookies from "js-cookie";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  let user = useSelector((state) => state.user.currentUser);
  if (user && typeof user === "string") {
    user = JSON.parse(user);
  }
  let isLoggedIn = !!user;

  const handleLogout = () => {
    Cookies.remove("auth");
    dispatch(userActions.logout());
    setTabValue(0);
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDashboardClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDashboardClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ bgcolor: "#2b2d42" }} position='sticky'>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton component={Link} to='/'>
            <Typography marginRight={1} color={"white"} variant='h6'>
              BookMyMovie
            </Typography>
            <LocalMoviesSharpIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>

        <Stack direction={"row-reverse"} width={"100%"}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            sx={{ shapeOutside: "none" }}
            textColor='inherit'
            indicatorColor='secondary'
            aria-label='nav tabs'
          >
            {!isLoggedIn && <Tab component={Link} to='/signin' label='Login' />}
            {!isLoggedIn && (
              <Tab component={Link} to='/create' label='Sign Up' />
            )}
            {isLoggedIn && (
              <Tab
                label={
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>Dashboard</span>
                    <KeyboardArrowDown />
                  </span>
                }
                id='dashboard-button'
                onClick={handleDashboardClick}
                aria-controls={open ? "dashboard-menu" : undefined}
                aria-haspopup='true'
                aria-expanded={open ? "true" : undefined}
              />
            )}
            <Menu
              id='dashboard-menu'
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{
                "aria-labelledby": "dashboard-button",
              }}
              onClose={handleDashboardClose}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  navigate("/profile");
                }}
              >
                Profile
              </MenuItem>
              {isLoggedIn && user && user.role === "admin" ? (
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/allbookings");
                  }}
                >
                  All Bookings
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/booked");
                  }}
                >
                  My Bookings
                </MenuItem>
              )}
              {isLoggedIn && user && user.role !== "admin" && (
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/wishlist");
                  }}
                >
                  Wishlist
                </MenuItem>
              )}
              {isLoggedIn && user && user.role === "admin" && (
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/listMovies");
                  }}
                >
                  Modify Movies
                </MenuItem>
              )}
              {isLoggedIn && user && user.role === "admin" && (
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/listUsers");
                  }}
                >
                  Modify Users
                </MenuItem>
              )}
              {isLoggedIn && user && user.role === "admin" && (
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/listTheaters");
                  }}
                >
                  Modify Theaters
                </MenuItem>
              )}
              {isLoggedIn && user && user.role === "admin" && (
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/listShows");
                  }}
                >
                  Modify Shows
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Tabs>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
