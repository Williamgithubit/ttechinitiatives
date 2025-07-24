import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  CircularProgress, 
  Button, 
  Card, 
  CardContent, 
  LinearProgress, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import { 
  People as PeopleIcon, 
  School as SchoolIcon, 
  Event as EventIcon, 
  Email as EmailIcon, 
  Add as AddIcon, 
  CloudUpload as UploadIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../../store/Admin/userManagementApi';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon: Icon, color, onClick, loading = false }) => (
  <Card 
    elevation={3} 
    sx={{ 
      p: 3, 
      textAlign: 'center', 
      cursor: 'pointer',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
    }} 
    onClick={onClick}
  >
    <Box sx={{ color: `${color}.main`, mb: 2 }}>
      <Icon fontSize="large" />
    </Box>
    {loading ? (
      <Box sx={{ width: '100%', my: 1 }}>
        <LinearProgress />
      </Box>
    ) : (
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
        {value}
      </Typography>
    )}
    <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 'auto' }}>
      {title}
    </Typography>
  </Card>
);

const RecentActivityItem = ({ icon, primary, secondary, time, status = 'success' }) => {
  const theme = useTheme();
  const statusColors = {
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
  };

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ px: 0, display: 'block' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: statusColors[status] }}>
              {icon}
            </Avatar>
          </ListItemAvatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" color="text.primary">
              {primary}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
              {secondary}
            </Typography>
            <Box display="flex" alignItems="center" mt={0.5}>
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, fontSize: '1rem', color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {time}
              </Typography>
            </Box>
          </Box>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: users = [], isLoading: isLoadingUsers } = useGetUsersQuery();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading other data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample data for charts
  const userData = [
    { name: 'Jan', users: 40 },
    { name: 'Feb', users: 30 },
    { name: 'Mar', users: 50 },
    { name: 'Apr', users: 60 },
    { name: 'May', users: 70 },
    { name: 'Jun', users: 85 },
  ];

  const stats = [
    { 
      title: 'Total Users', 
      value: users.length, 
      icon: PeopleIcon, 
      color: 'primary', 
      path: '/dashboard/admin/users',
      loading: isLoadingUsers 
    },
    { 
      title: 'Active Programs', 
      value: '24', 
      icon: SchoolIcon, 
      color: 'success', 
      path: '/dashboard/admin/programs',
      loading: false
    },
    { 
      title: 'Upcoming Events', 
      value: '8', 
      icon: EventIcon, 
      color: 'warning', 
      path: '/dashboard/admin/events',
      loading: false
    },
    { 
      title: 'Messages', 
      value: '5', 
      icon: EmailIcon, 
      color: 'error', 
      path: '/dashboard/admin/messages',
      loading: false
    },
  ];

  const recentActivities = [
    {
      icon: <PeopleIcon />,
      primary: 'New user registered',
      secondary: 'John Doe (john@example.com)',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      icon: <SchoolIcon />,
      primary: 'New program created',
      secondary: 'Introduction to React',
      time: '2 hours ago',
      status: 'info'
    },
    {
      icon: <WarningIcon />,
      primary: 'Login attempt failed',
      secondary: '3 failed attempts from 192.168.1.1',
      time: 'Yesterday',
      status: 'error'
    },
  ];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's what's happening with your platform today.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/dashboard/admin/users/new')}
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            Add User
          </Button>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => navigate('/dashboard/admin/users/import')}
            sx={{
              color: 'primary.main',
              borderColor: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                bgcolor: 'action.hover'
              }
            }}
          >
            Bulk Import
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                loading={stat.loading}
                onClick={() => navigate(stat.path)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Charts and Recent Activity */}
      <Grid container spacing={3}>
        {/* User Growth Chart */}
        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>User Growth</Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill={theme.palette.primary.main} name="Users" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Recent Activity</Typography>
                <Chip 
                  label="View All" 
                  size="small" 
                  variant="outlined"
                  onClick={() => navigate('/dashboard/admin/activity')}
                  clickable
                />
              </Box>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {recentActivities.map((activity, index) => (
                  <RecentActivityItem
                    key={index}
                    icon={activity.icon}
                    primary={activity.primary}
                    secondary={activity.secondary}
                    time={activity.time}
                    status={activity.status}
                  />
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
