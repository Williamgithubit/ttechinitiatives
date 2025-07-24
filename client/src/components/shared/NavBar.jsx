import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../store/Auth/authSlice';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { motion } from 'framer-motion';

const NavBar = () => {
  const { user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          T-Tech Initiatives
        </Typography>
        <Button color="inherit" component={Link} to="/programs">
          Programs
        </Button>
        {user && role === 'student' && (
          <Button color="inherit" component={Link} to="/dashboard/student">
            Student Dashboard
          </Button>
        )}
        {user && role === 'teacher' && (
          <Button color="inherit" component={Link} to="/dashboard/teacher">
            Teacher Dashboard
          </Button>
        )}
        {user && role === 'parent' && (
          <Button color="inherit" component={Link} to="/dashboard/parent">
            Parent Dashboard
          </Button>
        )}
        {user && role === 'admin' && (
          <Button color="inherit" component={Link} to="/dashboard/admin">
            Admin Dashboard
          </Button>
        )}
        {user ? (
          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </motion.div>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;