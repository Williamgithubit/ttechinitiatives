import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  School as SchoolIcon,
  Category as CategoryIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { fetchPrograms, deleteProgram } from '@/store/Admin/programSlice';
import ProgramForm from './ProgramForm';
import { format } from 'date-fns';
import { useConfirm } from 'material-ui-confirm';

const ProgramManagement = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const confirm = useConfirm();
  const { programs, loading, error } = useSelector((state) => state.program);
  const [searchTerm, setSearchTerm] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenForm = (program = null) => {
    setSelectedProgram(program);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedProgram(null);
  };

  const handleDelete = async (programId) => {
    try {
      await confirm({
        title: 'Delete Program',
        description: 'Are you sure you want to delete this program? This action cannot be undone.',
        confirmationText: 'Delete',
        confirmationButtonProps: { variant: 'contained', color: 'error' },
      });
      await dispatch(deleteProgram(programId)).unwrap();
    } catch (error) {
      // User cancelled or deletion failed
      console.error('Deletion cancelled or failed:', error);
    }
  };

  const filteredPrograms = programs
    .filter((program) =>
      program.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.code?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(program => ({
      ...program,
      // Ensure dates are properly parsed
      createdAt: program.createdAt ? new Date(program.createdAt) : null,
      updatedAt: program.updatedAt ? new Date(program.updatedAt) : null,
      startDate: program.startDate ? new Date(program.startDate) : null,
      endDate: program.endDate ? new Date(program.endDate) : null,
    }));

  const getStatusChip = (status) => {
    const statusMap = {
      active: { label: 'Active', color: 'success' },
      draft: { label: 'Draft', color: 'default' },
      archived: { label: 'Archived', color: 'default' },
    };
    
    const statusInfo = statusMap[status] || { label: status, color: 'default' };
    
    return (
      <Chip
        label={statusInfo.label}
        color={statusInfo.color}
        size="small"
        variant="outlined"
      />
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Error loading programs: {error}</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2">Program Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Add Program
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search programs..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
        />
      </Paper>

      <Grid container spacing={3}>
        {Array.isArray(filteredPrograms) && filteredPrograms.map((program) => (
          <Grid key={program.id} size={{ xs: 12, md: 6, lg: 4 }} item>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6" component="h3">
                    {program.name}
                  </Typography>
                  {getStatusChip(program.status)}
                </Box>
                
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {program.code}
                </Typography>
                
                <Stack spacing={1} mt={2} mb={2}>
                  <Box display="flex" alignItems="center">
                    <SchoolIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {program.department || 'No department assigned'}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <ScheduleIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {program.duration} {program.durationUnit || 'months'}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <PeopleIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {program.studentsCount || 0} students enrolled
                    </Typography>
                  </Box>
                </Stack>
                
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2, mb: 2 }}>
                  {program.description ? String(program.description).substring(0, 100) : ''}
                  {program.description && program.description.length > 100 ? '...' : ''}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="textSecondary">
                    Last updated: {program.updatedAt ? format(program.updatedAt, 'MMM d, yyyy') : 'N/A'}
                  </Typography>
                  
                  <Box>
                    <Tooltip title="Edit Program">
                      <IconButton size="small" onClick={() => handleOpenForm(program)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Delete Program">
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDelete(program.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {filteredPrograms.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>No programs found. Create your first program to get started.</Typography>
        </Paper>
      )}
      
      <ProgramForm 
        open={openForm} 
        onClose={handleCloseForm} 
        program={selectedProgram} 
      />
    </Box>
  );
};

export default ProgramManagement;
