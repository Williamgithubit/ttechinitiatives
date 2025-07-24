import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  IconButton,
  InputAdornment,
  FormHelperText,
  Box,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { addNewUser } from '../../store/Admin/userManagementSlice';

const ROLES = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'parent', label: 'Parent' },
];

const AddUserDialog = ({ open, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      password: ''
    }
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const generateSecurePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setGeneratedPassword(password);
    setValue('password', password);
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(addNewUser(data)).unwrap();
      reset();
      setGeneratedPassword('');
      onSuccess();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleClose = () => {
    reset();
    setGeneratedPassword('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            {...register('name', { required: 'Name is required' })}
            label="Full Name"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
            autoFocus
          />
          
          <TextField
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address',
              },
            })}
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          
          <FormControl fullWidth margin="normal" variant="outlined" error={!!errors.role}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              {...register('role', { required: 'Role is required' })}
              labelId="role-label"
              label="Role"
              defaultValue=""
              error={!!errors.role}
            >
              {ROLES.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
            {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
          </FormControl>
          
          <Box sx={{ mt: 2, mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <InputLabel>Password</InputLabel>
              <Button 
                size="small" 
                onClick={generateSecurePassword}
                type="button"
                sx={{ textTransform: 'none' }}
              >
                Generate Password
              </Button>
            </Box>
            <TextField
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              value={watch('password')}
              onChange={(e) => {
                setValue('password', e.target.value);
                if (e.target.value !== generatedPassword) {
                  setGeneratedPassword('');
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {generatedPassword && (
              <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 1 }}>
                A strong password has been generated. Please save it securely as it won't be shown again.
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={handleClose} 
            disabled={isSubmitting}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ ml: 2 }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Create User'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserDialog;