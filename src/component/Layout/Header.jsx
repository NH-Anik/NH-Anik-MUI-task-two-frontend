import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from 'react-hot-toast';
import { useEffect,useState } from "react";
import { Button, IconButton, Menu, MenuItem, Typography, Avatar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Logout as LogoutIcon } from '@mui/icons-material';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    setTimeout(() => {
      navigate("/");
    }, 1000);
    toast.success("Logout Successfully");
    setVisibleLogout(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [visibleLogout, setVisibleLogout] = useState(false);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorEl && !anchorEl.contains(event.target)) {
        handleProfileClose();
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [anchorEl]);

  return (
    <div>
      <div className="downShadow">
        <nav>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
              <Link to="/">
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'transparent', background: 'linear-gradient(to right, #1e88e5, #00e676, #3d5afe)', WebkitBackgroundClip: 'text' }}>
                  Test - 2
                </Typography>
              </Link>

              <div className="lg:hidden">
                <IconButton onClick={toggleMenu} aria-label="toggle menu">
                  {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </div>

              <div style={{ display: isMenuOpen ? 'block' : 'none', position: 'absolute', top: '64px', right: '0', backgroundColor: 'white', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
                  {
                    !auth?.user ? (
                      <div style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'center',gap:"6px"}}>
                        <Link to="/login">
                          <Button variant="contained" color="primary">Sign in</Button>
                        </Link>
                        <Link to="/registration">
                          <Button variant="contained" color="primary">Sign up</Button>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <Link to="/log-home">
                          <Button variant="outlined" color="secondary" style={{ marginBottom: '8px' }}>Home</Button>
                        </Link>
                      </div>
                    )
                  }

                  {
                    auth?.user && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={handleProfileClick} aria-label="profile">
                          <Avatar src={auth?.user?.image} />
                          <Typography variant="body1" style={{ marginLeft: '8px' }}>{auth?.user?.name}</Typography>
                        </IconButton>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileClose}>
                          <MenuItem onClick={() => handleProfileClose()}>
                            <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
                          </MenuItem>
                          <MenuItem onClick={() => setVisibleLogout(true)}>
                            <LogoutIcon style={{ marginRight: '8px' }} />
                            Sign out
                          </MenuItem>
                        </Menu>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Dialog open={visibleLogout} onClose={() => setVisibleLogout(false)}>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Are you sure you want to log out?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVisibleLogout(false)} color="primary">Cancel</Button>
            <Button onClick={handleLogout} color="secondary" startIcon={<LogoutIcon />}>LogOut</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
