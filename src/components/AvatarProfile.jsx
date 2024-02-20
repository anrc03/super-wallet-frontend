import React from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from './redux/UserSlice';

export default function AvatarProfile() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
    <Box sx={{ flexGrow: 0, mt: '16px' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Profile Default" src="src/assets/images/Profile.png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '58px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography className="avatar" textAlign="center"><i className="bi bi-person-fill"></i> Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography className="avatar" textAlign="center"><i className="bi bi-house-fill"></i> Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography className='logout-button' textAlign="center"><i className="bi bi-box-arrow-in-left"></i> Logout</Typography>
                    </MenuItem>
              </Menu>
            </Box>
    </>
  )
}
