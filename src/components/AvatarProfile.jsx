import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "./redux/UserSlice";
import axios from "axios";
import { BASE_CUSTOMER } from "../constant/Endpoint";

export default function AvatarProfile() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");

  const getCustomerData = async () => {
    await axios
      .get(BASE_CUSTOMER + "/" + user.customerId)
      .then((res) => {
        setName(res.data.data.firstName);
        if (res.data.data.images) {
          setPicture(res.data.data.images);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0, mt: "16px" }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {picture ? (
              <Avatar alt="Profile Default" src={picture} />
            ) : (
              <Avatar
                alt="Profile Default"
                src="src/assets/images/Profile.png"
              />
            )}
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "58px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <div className="justify-content-center align-items-center d-flex">
            <span style={{ fontSize: "18px", fontWeight: "500" }}>{name}</span>
          </div>
          <hr
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              border: "3px solid #a2cc72",
              marginLeft: "20px",
              marginRight: "20px",
              borderRadius: "10px",
            }}
          />
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography className="avatar" textAlign="center">
              <Link to="/profile" className="nav-item nav-link">
                <i className="bi bi-person-fill"></i> Profile
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography className="avatar" textAlign="center">
              <Link to="/customer/dashboard" className='nav-item nav-link'>
                <i className="bi bi-house-fill"></i> Dashboard
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography className="logout-button" textAlign="center">
              <i className="bi bi-box-arrow-in-left"></i> Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
