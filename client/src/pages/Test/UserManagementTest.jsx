import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  MenuItem,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { 
  getUserRole, 
  updateUserRole, 
  getUserProfile, 
  updateUserProfile 
} from '../../services/userService';

const UserManagementTest = () => {
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [newRole, setNewRole] = useState('student');
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    photoURL: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [actionHistory, setActionHistory] = useState([]);

  const logAction = (action) => {
    setActionHistory(prev => [
      { action, timestamp: new Date().toISOString() },
      ...prev.slice(0, 9) // Keep only the last 10 actions
    ]);
  };

  const handleGetUserRole = async () => {
    if (!userId) {
      setError('Please enter a user ID');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const role = await getUserRole(userId);
      setUserRole(role);
      logAction(`Fetched role: ${role} for user ${userId}`);
      setSuccess(`User role: ${role}`);
    } catch (err) {
      setError(`Error getting user role: ${err.message}`);
      logAction(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserRole = async () => {
    if (!userId || !newRole) {
      setError('Please enter a user ID and select a role');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await updateUserRole(userId, newRole);
      setUserRole(newRole);
      logAction(`Updated role to ${newRole} for user ${userId}`);
      setSuccess(`Successfully updated role to ${newRole}`);
    } catch (err) {
      setError(`Error updating user role: ${err.message}`);
      logAction(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUserProfile = async () => {
    if (!userId) {
      setError('Please enter a user ID');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const profile = await getUserProfile(userId);
      if (profile) {
        setProfileData({
          displayName: profile.displayName || '',
          email: profile.email || '',
          photoURL: profile.photoURL || ''
        });
        logAction(`Fetched profile for user ${userId}`);
        setSuccess('Successfully fetched user profile');
      } else {
        setError('User not found');
        logAction('User not found');
      }
    } catch (err) {
      setError(`Error getting user profile: ${err.message}`);
      logAction(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!userId) {
      setError('Please enter a user ID');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await updateUserProfile(userId, profileData);
      logAction(`Updated profile for user ${userId}`);
      setSuccess('Successfully updated user profile');
    } catch (err) {
      setError(`Error updating profile: ${err.message}`);
      logAction(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardHeader title="User Management Test" />
        <CardContent>
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Test User Management Functions
            </Typography>
            
            <TextField
              label="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="Enter user ID"
            />

            <Box display="flex" gap={2} mt={2} mb={4} flexWrap="wrap">
              <Button 
                variant="contained" 
                onClick={handleGetUserRole}
                disabled={loading || !userId}
              >
                {loading ? <CircularProgress size={24} /> : 'Get User Role'}
              </Button>
              
              <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel>Role</InputLabel>
                <Select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  label="Role"
                  disabled={loading}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="parent">Parent</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              
              <Button 
                variant="outlined" 
                onClick={handleUpdateUserRole}
                disabled={loading || !userId}
              >
                Update Role
              </Button>
              
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleGetUserProfile}
                disabled={loading || !userId}
              >
                Get Profile
              </Button>
            </Box>

            <Box mt={4} mb={4}>
              <Typography variant="h6" gutterBottom>
                Profile Data
              </Typography>
              <TextField
                label="Display Name"
                value={profileData.displayName}
                onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Photo URL"
                value={profileData.photoURL}
                onChange={(e) => setProfileData({...profileData, photoURL: e.target.value})}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleUpdateProfile}
                disabled={loading || !userId}
                sx={{ mt: 2 }}
              >
                Update Profile
              </Button>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Action History
            </Typography>
            <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto' }}>
              <List dense>
                {actionHistory.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={item.action}
                        secondary={new Date(item.timestamp).toLocaleString()}
                      />
                    </ListItem>
                    {index < actionHistory.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
                {actionHistory.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No actions yet" />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserManagementTest;
