import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, CircularProgress, Typography, Avatar, IconButton } from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon, CloudUpload as CloudUploadIcon, Person as PersonIcon } from '@mui/icons-material';
import { useCreateUserMutation, useUpdateUserMutation, useGetUserByIdQuery } from '../../../store/Admin/userManagementApi';
import { useSnackbar } from 'notistack';

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Required'),
  role: Yup.string().required('Role is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number'),
  isActive: Yup.boolean(),
  ...(!useParams().id && {
    password: Yup.string().required('Password is required').min(8, 'Too short!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  })
});

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isEditMode = Boolean(id);
  const [avatarPreview, setAvatarPreview] = useState('');
  
  // API Hooks
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data: user, isLoading } = useGetUserByIdQuery(id, { skip: !isEditMode });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      role: 'student',
      isActive: true,
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userData = { ...values };
        if (isEditMode) {
          await updateUser({ id, ...userData }).unwrap();
          enqueueSnackbar('User updated', { variant: 'success' });
        } else {
          await createUser(userData).unwrap();
          enqueueSnackbar('User created', { variant: 'success' });
        }
        navigate('/dashboard/admin/users');
      } catch (error) {
        enqueueSnackbar(error.data?.message || 'Error', { variant: 'error' });
      }
    },
  });

  // Load user data in edit mode
  useEffect(() => {
    if (isEditMode && user) {
      formik.setValues({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'student',
        isActive: user.isActive !== undefined ? user.isActive : true,
        password: '',
        confirmPassword: ''
      });
    }
  }, [user, isEditMode]);

  if (isLoading && isEditMode) {
    return <CircularProgress />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mb={3}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>Back</Button>
        <Typography variant="h4" gutterBottom>
          {isEditMode ? 'Edit User' : 'Create User'}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Profile" />
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Avatar src={avatarPreview} sx={{ width: 100, height: 100, mb: 2 }}>
                  <PersonIcon fontSize="large" />
                </Avatar>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setAvatarPreview(URL.createObjectURL(file));
                  }}
                />
                <label htmlFor="avatar-upload">
                  <Button component="span" startIcon={<CloudUploadIcon />}>
                    Upload Photo
                  </Button>
                </label>
              </Box>
              <FormControl fullWidth margin="normal">
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.isActive}
                      onChange={formik.handleChange}
                      name="isActive"
                    />
                  }
                  label={formik.values.isActive ? 'Active' : 'Inactive'}
                />
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="User Details" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    disabled={isEditMode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={formik.touched.role && Boolean(formik.errors.role)}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      label="Role"
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="teacher">Teacher</MenuItem>
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="parent">Parent</MenuItem>
                    </Select>
                    <FormHelperText>{formik.touched.role && formik.errors.role}</FormHelperText>
                  </FormControl>
                </Grid>
                {!isEditMode && (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Saving...' : 'Save User'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
