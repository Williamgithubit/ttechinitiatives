import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { fetchAllUsers, selectUserManagementState, setFilter, setPage, updateUser, removeUser } from '../../store/Admin/userManagementSlice';
import AddUserDialog from './AddUserDialog';

const ROLES = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'parent', label: 'Parent' },
  { value: 'admin', label: 'Administrator' },
];

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error, success, currentPage, itemsPerPage, totalItems, filters } = useSelector(selectUserManagementState);
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Fetch users when component mounts or when filters change
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchData = async () => {
      try {
        await dispatch(fetchAllUsers());
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching users:', error);
        }
      }
    };
    
    fetchData();
    
    // Cleanup function to cancel any pending requests if component unmounts
    return () => {
      controller.abort();
    };
  }, [dispatch, filters]); // Add filters to dependency array to refetch when filters change

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setPage(1));
    // Note: itemsPerPage is static at 10 in the slice; update if dynamic
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  };

  const handleRefresh = () => {
    dispatch(fetchAllUsers());
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddUserSuccess = () => {
    setOpenAddDialog(false);
    setSnackbar({
      open: true,
      message: 'User added successfully!',
      severity: 'success',
    });
    dispatch(fetchAllUsers());
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setOpenEditDialog(true);
  };

  const handleUpdateRole = async () => {
    if (selectedUser) {
      try {
        await dispatch(updateUser({ userId: selectedUser.id, role: editRole })).unwrap();
        setSnackbar({
          open: true,
          message: 'User role updated successfully!',
          severity: 'success',
        });
        setOpenEditDialog(false);
        dispatch(fetchAllUsers());
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to update user role.',
          severity: 'error',
        });
      }
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await dispatch(removeUser({ 
        userId: userToDelete.id, 
        authUid: userToDelete.uid // Pass the auth UID if available
      })).unwrap();
      
      setSnackbar({
        open: true,
        message: 'User deleted successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbar({
        open: true,
        message: `Failed to delete user: ${error.message}`,
        severity: 'error',
      });
    } finally {
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'teacher': return 'primary';
      case 'parent': return 'warning';
      default: return 'default';
    }
  };

  // Paginate filtered users
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Box>
      <Card>
        <CardHeader
          title="User Management"
          action={
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
            >
              Add User
            </Button>
          }
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Search"
                name="search"
                value={filters.search || ''}
                onChange={handleFilterChange}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={filters.role || ''}
                  onChange={handleFilterChange}
                  label="Role"
                >
                  <MenuItem value="">All Roles</MenuItem>
                  {ROLES.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Refresh">
                <span>
                  <IconButton onClick={handleRefresh} disabled={loading}>
                    <RefreshIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          </Grid>

          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((user) => (
                        <TableRow key={user.id} hover>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar
                                src={user.photoURL}
                                alt={user.name || 'User'}
                                sx={{ width: 40, height: 40, mr: 2 }}
                              >
                                {user.name?.[0] || 'U'}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2">
                                  {user.name || 'Unnamed User'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {user.id}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Chip
                              label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              color={getRoleColor(user.role)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active'}
                              color={user.status === 'active' ? 'success' : 'default'}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small" color="primary" onClick={() => handleEditUser(user)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <Tooltip title={user.role === 'admin' ? 'Cannot delete admin users' : 'Delete User'}>
                              <span>
                                <IconButton 
                                  color="error" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(user);
                                  }}
                                  disabled={user.role === 'admin'}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </span>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                          <Typography color="textSecondary">No users found</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={itemsPerPage}
                page={currentPage - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </CardContent>
      </Card>

      <AddUserDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSuccess={handleAddUserSuccess}
      />

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              label="Role"
            >
              {ROLES.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateRole} variant="contained" disabled={!editRole}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete User
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the user "{userToDelete?.name || userToDelete?.email}"?
            <br />
            <strong>This action cannot be undone.</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error"
            variant="contained"
            autoFocus
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;