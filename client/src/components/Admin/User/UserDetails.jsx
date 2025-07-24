import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Avatar,
  Grid,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Event as EventIcon,
  LockReset as LockResetIcon,
} from '@mui/icons-material';
import { useGetUserByIdQuery, useDeleteUserMutation, useResetPasswordMutation } from '../../../store/Admin/userManagementApi';
import { useSnackbar } from 'notistack';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(id).unwrap();
      enqueueSnackbar('User deleted successfully', { variant: 'success' });
      navigate('/dashboard/admin/users');
    } catch (error) {
      enqueueSnackbar(error.data?.message || 'Failed to delete user', { variant: 'error' });
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(id).unwrap();
      enqueueSnackbar('Password reset email sent successfully', { variant: 'success' });
      setOpenResetDialog(false);
    } catch (error) {
      enqueueSnackbar(error.data?.message || 'Failed to reset password', { variant: 'error' });
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'teacher': return 'primary';
      case 'student': return 'success';
      case 'parent': return 'warning';
      default: return 'default';
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={3}>
        <Typography color="error" gutterBottom>
          Error loading user details. Please try again.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box textAlign="center" p={3}>
        <Typography>User not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/dashboard/admin/users/${id}/edit`)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDeleteDialog(true)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={user.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: 48,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                {user.name?.[0] || <PersonIcon fontSize="inherit" />}
              </Avatar>
              <Typography variant="h5" component="div" gutterBottom>
                {user.name}
              </Typography>
              <Chip
                label={user.role}
                color={getRoleColor(user.role)}
                size="small"
                sx={{ mb: 2 }}
              />
              <Chip
                label={user.isActive ? 'Active' : 'Inactive'}
                color={user.isActive ? 'success' : 'default'}
                variant="outlined"
                size="small"
              />
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LockResetIcon />}
                onClick={() => setOpenResetDialog(true)}
                disabled={isResetting}
                sx={{ mb: 1 }}
              >
                {isResetting ? 'Sending...' : 'Reset Password'}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<EmailIcon />}
                onClick={() => window.location = `mailto:${user.email}`}
              >
                Send Email
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Contact Information
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                      <EmailIcon color="action" sx={{ mr: 1 }} />
                      <Typography>{user.email}</Typography>
                    </Box>
                    {user.phone && (
                      <Box display="flex" alignItems="center">
                        <PhoneIcon color="action" sx={{ mr: 1 }} />
                        <Typography>{user.phone}</Typography>
                      </Box>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Account Status
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                      <EventIcon color="action" sx={{ mr: 1 }} />
                      <Typography>
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <EventIcon color="action" sx={{ mr: 1 }} />
                      <Typography>
                        Last Active: {user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Never'}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Activity Log
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography color="textSecondary">
                    Activity log will be displayed here
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog
        open={openResetDialog}
        onClose={() => setOpenResetDialog(false)}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset the password for {user.name}? An email with instructions will be sent to {user.email}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetDialog(false)}>Cancel</Button>
          <Button
            onClick={handleResetPassword}
            color="primary"
            variant="contained"
            disabled={isResetting}
          >
            {isResetting ? 'Sending...' : 'Reset Password'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetails;
