import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider,
  IconButton, ListItemButton, ListItemIcon, ListItemText, Avatar,
  Tooltip, Menu, MenuItem, Collapse, useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon, ChevronLeft, Dashboard, People, School,
  Assessment, Article, Event, Email, Settings, ExpandLess,
  ExpandMore, Logout, Person
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/Auth/authSlice';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard/admin' },
    {
      text: 'Users',
      icon: <People />,
      children: [
        { text: 'All Users', path: '/dashboard/admin/users' },
        { text: 'Add New User', path: '/dashboard/admin/users/new' },
        { text: 'Bulk Import Users', path: '/dashboard/admin/users/import' },
      ],
    },
    {
      text: 'Programs',
      icon: <School />,
      children: [
        { text: 'All Programs', path: '/dashboard/admin/programs' },
        { text: 'Pending Approval', path: '/dashboard/admin/programs/pending' },
      ],
    },
    { text: 'Analytics', icon: <Assessment />, path: '/dashboard/admin/analytics' },
    { text: 'Content', icon: <Article />, path: '/dashboard/admin/content' },
    { text: 'Events', icon: <Event />, path: '/dashboard/admin/events' },
    { text: 'Messages', icon: <Email />, path: '/dashboard/admin/messages' },
    { text: 'Settings', icon: <Settings />, path: '/dashboard/admin/settings' },
  ];

  const handleDrawerToggle = () => setOpen(!open);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  const toggleExpand = (item) => {
    setExpanded({ ...expanded, [item]: !expanded[item] });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <div key={item.text}>
              {item.children ? (
                <>
                  <ListItemButton onClick={() => toggleExpand(item.text)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {expanded[item.text] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={expanded[item.text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItemButton
                          key={child.text}
                          sx={{ pl: 4 }}
                          onClick={() => navigate(child.path)}
                        >
                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )}
            </div>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!open && (
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h4" component="h1">
              Admin Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton onClick={handleMenu} size="small">
                <Avatar sx={{ width: 40, height: 40 }}>
                  {user?.displayName?.[0] || <Person />}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem onClick={() => navigate('/dashboard/admin/profile')}>
                <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <Outlet />
      </Main>
    </Box>
  );
};

export default AdminLayout;
