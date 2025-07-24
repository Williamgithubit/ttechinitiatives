import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Grid,
  Button,
  Paper,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Chip,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Group as GroupIcon,
  GroupAdd as GroupAddIcon,
  InsertChart as InsertChartIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  ManageAccounts as ManageAccountsIcon,
  Event as EventIcon,
  Article as ArticleIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Warning as WarningIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

// Import Admin Components
import UserManagement from '../../components/Admin/UserManagement';
import AddUserDialog from '../../components/Admin/AddUserDialog';
import ProgramManagement from '../../components/Admin/ProgramManagement/ProgramManagement';
import Dashboard from '../../components/Admin/Dashboard';

const drawerWidth = 240;

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: <InsertChartIcon /> },
  { id: 'users', label: 'User Management', icon: <PeopleIcon /> },
  { id: 'programs', label: 'Programs', icon: <SchoolIcon /> },
  { id: 'reports', label: 'Reports', icon: <ArticleIcon /> },
  { id: 'events', label: 'Events', icon: <EventIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

const roles = ["Teacher", "Student", "Parent"];

export default function AdminDashboard() {
  const [tab, setTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddUser = () => {
    setUsers([...users, { ...form, id: Date.now() }]);
    setForm({ name: "", email: "", role: "Teacher" });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      bgcolor: 'background.paper',
    }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main', fontWeight: 600 }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {tabs.map((item) => (
          <ListItem 
            button 
            key={item.id} 
            onClick={() => {
              setTab(item.id);
              setMobileOpen(false);
            }}
            selected={tab === item.id}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              mb: 0.5,
              mx: 1,
              borderRadius: 1,
            }}
          >
            <ListItemIcon sx={{ 
              color: tab === item.id ? 'primary.contrastText' : 'text.primary',
              minWidth: 40,
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{
                color: tab === item.id ? 'primary.contrastText' : 'text.primary',
                fontWeight: tab === item.id ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button 
          fullWidth 
          variant="outlined" 
          color="inherit"
          startIcon={<ExitToAppIcon />}
          onClick={() => {
            // Handle logout
          }}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              color: 'primary.main',
              display: { sm: 'none' } 
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main', fontWeight: 600 }}>
              TTech Initiatives Admin
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ 
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
          },
        }}
        aria-label="admin navigation"
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ 
            keepMounted: true,
            disableScrollLock: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 },
          pt: { xs: 8, sm: 9 },
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        
        {/* Main Content Area */}
        {tab === 'dashboard' && (
          <Dashboard />
        )}

        {tab === 'users' && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" color="primary">User Management</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<GroupAddIcon />}
                onClick={() => setOpenAddDialog(true)}
              >
                Add User
              </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <UserManagement />
            <AddUserDialog 
              open={openAddDialog} 
              onClose={() => setOpenAddDialog(false)}
              onUserAdded={() => {
                setSnackbar({ open: true, message: 'User added successfully!', severity: 'success' });
                setOpenAddDialog(false);
              }}
            />
          </Paper>
        )}

        {tab === 'programs' && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <ProgramManagement />
          </Paper>
        )}

        {tab === 'reports' && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" color="primary">Reports & Analytics</Typography>
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<ArticleIcon />}
                  onClick={() => setSnackbar({ open: true, message: 'Export functionality coming soon!', severity: 'info' })}
                  sx={{ mr: 1 }}
                >
                  Export
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<InsertChartIcon />}
                  onClick={() => setSnackbar({ open: true, message: 'Generate Report functionality coming soon!', severity: 'info' })}
                >
                  Generate Report
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              {['User Activity', 'Program Performance', 'Financial Overview', 'System Health'].map((report) => (
                <Grid key={report} sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 1 }}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      '&:hover': { boxShadow: 1, cursor: 'pointer' },
                      transition: 'box-shadow 0.3s',
                    }}
                    onClick={() => setSnackbar({ open: true, message: `${report} report coming soon!`, severity: 'info' })}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <InsertChartIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" gutterBottom>{report}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        View detailed {report.toLowerCase()} reports and analytics
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {tab === 'events' && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" color="primary">Event Management</Typography>
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<EventIcon />}
                  onClick={() => setSnackbar({ open: true, message: 'View Calendar functionality coming soon!', severity: 'info' })}
                  sx={{ mr: 1 }}
                >
                  Calendar View
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setSnackbar({ open: true, message: 'Create Event functionality coming soon!', severity: 'info' })}
                >
                  Create Event
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <EventIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Upcoming Events
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', mb: 3 }}>
                No upcoming events scheduled. Create a new event to get started.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                startIcon={<EventIcon />}
                onClick={() => setSnackbar({ open: true, message: 'Create Event functionality coming soon!', severity: 'info' })}
              >
                Schedule an Event
              </Button>
            </Box>
          </Paper>
        )}

        {tab === 'settings' && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <Typography variant="h5" color="primary" gutterBottom>System Settings</Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid sx={{ width: { xs: '100%', md: '50%' }, p: 1 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardHeader 
                    title="Account Settings" 
                    avatar={<ManageAccountsIcon color="primary" />}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Manage your account preferences, security settings, and notification preferences.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => setSnackbar({ open: true, message: 'Account settings coming soon!', severity: 'info' })}
                    >
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid sx={{ width: { xs: '100%', md: '50%' }, p: 1 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardHeader 
                    title="System Preferences" 
                    avatar={<SettingsIcon color="primary" />}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Configure system-wide settings, themes, and display options.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => setSnackbar({ open: true, message: 'System preferences coming soon!', severity: 'info' })}
                    >
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid sx={{ width: { xs: '100%', md: '50%' }, p: 1 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardHeader 
                    title="Notifications" 
                    avatar={<EmailIcon color="primary" />}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Manage email and in-app notification preferences.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => setSnackbar({ open: true, message: 'Notification settings coming soon!', severity: 'info' })}
                    >
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid sx={{ width: { xs: '100%', md: '50%' }, p: 1 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardHeader 
                    title="System Info" 
                    avatar={<InfoIcon color="primary" />}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Version 1.0.0
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => setSnackbar({ open: true, message: 'Check for updates coming soon!', severity: 'info' })}
                    >
                      Check for Updates
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}