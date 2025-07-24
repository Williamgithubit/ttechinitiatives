import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { login, selectAuthError, selectIsAuthenticated, selectUser } from "../store/Auth/authSlice";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const from = location.state?.from?.pathname || `/dashboard/${user.role}`;
      console.log('Login - User authenticated, redirecting to:', from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location.state]);

  const onSubmit = async (data) => {
    try {
      console.log('Login - Dispatching login action with:', data);
      await dispatch(login({ email: data.email, password: data.password })).unwrap();
      console.log('Login - Login successful');
    } catch (err) {
      console.error('Login - Login failed:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#000054' }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to access your account
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, color: 'text.secondary' }}>
                  <LoginIcon />
                </Box>
              ),
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="email"
          />
          <TextField
            {...register('password', { required: 'Password is required' })}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1, color: 'text.secondary' }}>
                  <LoginIcon />
                </Box>
              ),
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="current-password"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#000054] focus:ring-[#000054] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </Box>
            <Link to="/forgot-password" className="text-sm text-[#000054] hover:text-[#E32845]">
              Forgot password?
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <LoginIcon />}
            sx={{ bgcolor: '#000054', ':hover': { bgcolor: '#E32845' } }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Login;