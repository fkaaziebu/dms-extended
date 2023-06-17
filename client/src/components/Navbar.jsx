import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setToken } from "../state";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import {
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import profileImage from "../assets/user.png";
import { MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const isAuth = Boolean(useSelector((state) => state.auth.token));
  // const profileImage = useSelector((state) => state.auth.profile.profilePhoto);
  // console.log("Profile: ", profileImage);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <Typography variant="h1">
          <Link
            style={{
              textDecoration: "none",
              color: theme.palette.primary[100],
            }}
            to="/"
          >
            DMS
          </Link>
        </Typography>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              {isAuth ? (
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
              ) : (
                <IconButton>
                  <PersonOutlinedIcon
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "25px",
                    }}
                  />
                </IconButton>
              )}

              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Button onClick={() => setAnchorEl(null)}>
                {isAuth ? (
                  <MenuItem onClick={() => dispatch(setToken(""))}>
                    Log Out
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => navigate("/login")}>Log In</MenuItem>
                )}
              </Button>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
