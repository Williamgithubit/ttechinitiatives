import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Divider,
  Box,
  FormControlLabel,
  Checkbox,
  Chip,
  Autocomplete,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createProgram, updateProgram } from '@/store/Admin/programSlice';

// Helper function to safely parse date strings while handling timezone issues
const parseDateSafe = (dateString) => {
  if (!dateString) return null;
  // If it's already a Date object, return it
  if (dateString instanceof Date) return dateString;
  // If it's a string that can be parsed to a Date, return the Date
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

const programSchema = Yup.object().shape({
  name: Yup.string().required('Program name is required'),
  code: Yup.string().required('Program code is required'),
  description: Yup.string().required('Description is required'),
  department: Yup.string().required('Department is required'),
  duration: Yup.number()
    .typeError('Duration must be a number')
    .positive('Duration must be positive')
    .required('Duration is required'),
  durationUnit: Yup.string()
    .oneOf(['days', 'weeks', 'months', 'years'], 'Invalid duration unit')
    .required('Duration unit is required'),
  status: Yup.string()
    .oneOf(['active', 'draft', 'archived'], 'Invalid status')
    .required('Status is required'),
  startDate: Yup.date().nullable(),
  endDate: Yup.date()
    .nullable()
    .when('startDate', (startDate, schema) => {
      if (startDate) {
        return schema.min(
          startDate,
          'End date must be after start date'
        );
      }
      return schema;
    }),
  requirements: Yup.array().of(Yup.string()),
  tags: Yup.array().of(Yup.string()),
});

const ProgramForm = ({ open, onClose, program }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.program);
  const [requirementInput, setRequirementInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: program?.name || '',
      code: program?.code || '',
      description: program?.description || '',
      department: program?.department || '',
      duration: program?.duration || 6,
      durationUnit: program?.durationUnit || 'months',
      status: program?.status || 'draft',
      startDate: parseDateSafe(program?.startDate),
      endDate: parseDateSafe(program?.endDate),
      requirements: program?.requirements || [],
      tags: program?.tags || [],
      isFeatured: program?.isFeatured || false,
      maxStudents: program?.maxStudents || 50,
    },
    validationSchema: programSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setIsSubmitting(true);
      try {
        // Create a copy of values to modify
        const programData = { ...values };
        
        // Convert Date objects to ISO strings for Firestore
        if (programData.startDate) {
          programData.startDate = programData.startDate.toISOString();
        }
        if (programData.endDate) {
          programData.endDate = programData.endDate.toISOString();
        }
        
        if (program) {
          // Update existing program
          await dispatch(
            updateProgram({ 
              id: program.id, 
              ...programData 
            })
          ).unwrap();
        } else {
          // Create new program
          await dispatch(createProgram(programData)).unwrap();
        }
        onClose();
      } catch (error) {
        console.error('Error saving program:', error);
        // Formik's setStatus can be used to show form-level errors
        setSubmitting(false);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleAddRequirement = () => {
    if (requirementInput.trim() && !formik.values.requirements.includes(requirementInput.trim())) {
      formik.setFieldValue('requirements', [...formik.values.requirements, requirementInput.trim()]);
      setRequirementInput('');
    }
  };

  const handleRemoveRequirement = (requirementToRemove) => {
    formik.setFieldValue(
      'requirements',
      formik.values.requirements.filter((req) => req !== requirementToRemove)
    );
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formik.values.tags.includes(tagInput.trim())) {
      formik.setFieldValue('tags', [...formik.values.tags, tagInput.trim().toLowerCase()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    formik.setFieldValue(
      'tags',
      formik.values.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleKeyDown = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'requirement') {
        handleAddRequirement();
      } else if (type === 'tag') {
        handleAddTag();
      }
    }
  };

  // Common departments - can be moved to a config file
  const departments = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Health Sciences',
    'Arts & Humanities',
    'Social Sciences',
    'Natural Sciences',
    'Education',
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="program-form-dialog-title"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle id="program-form-dialog-title">
          {program ? 'Edit Program' : 'Create New Program'}
        </DialogTitle>
        
        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Program Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="normal"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="code"
                name="code"
                label="Program Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
                margin="normal"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={departments}
                value={formik.values.department}
                onChange={(_, value) => formik.setFieldValue('department', value || '')}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="department"
                    name="department"
                    label="Department"
                    margin="normal"
                    required
                    error={formik.touched.department && Boolean(formik.errors.department)}
                    helperText={formik.touched.department && formik.errors.department}
                    onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box display="flex" gap={2} mt={2} mb={2}>
                <TextField
                  id="duration"
                  name="duration"
                  label="Duration"
                  type="number"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.duration && Boolean(formik.errors.duration)}
                  helperText={formik.touched.duration && formik.errors.duration}
                  style={{ width: '40%' }}
                  required
                />
                
                <FormControl 
                  fullWidth 
                  margin="normal"
                  error={formik.touched.durationUnit && Boolean(formik.errors.durationUnit)}
                >
                  <InputLabel id="duration-unit-label">Duration Unit</InputLabel>
                  <Select
                    labelId="duration-unit-label"
                    id="durationUnit"
                    name="durationUnit"
                    value={formik.values.durationUnit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Duration Unit"
                    required
                  >
                    <MenuItem value="days">Days</MenuItem>
                    <MenuItem value="weeks">Weeks</MenuItem>
                    <MenuItem value="months">Months</MenuItem>
                    <MenuItem value="years">Years</MenuItem>
                  </Select>
                  {formik.touched.durationUnit && formik.errors.durationUnit && (
                    <FormHelperText>{formik.errors.durationUnit}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Status"
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  required
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <FormHelperText error>{formik.errors.status}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.isFeatured}
                    onChange={formik.handleChange}
                    name="isFeatured"
                    color="primary"
                  />
                }
                label="Featured Program"
                sx={{ mt: 2, display: 'block' }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="maxStudents"
                name="maxStudents"
                label="Maximum Students"
                type="number"
                value={formik.values.maxStudents}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                margin="normal"
                inputProps={{ min: 1 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Start Date"
                  value={formik.values.startDate}
                  onChange={(date) => formik.setFieldValue('startDate', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                      error: formik.touched.startDate && Boolean(formik.errors.startDate),
                      helperText: formik.touched.startDate && formik.errors.startDate,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="End Date"
                  value={formik.values.endDate}
                  onChange={(date) => formik.setFieldValue('endDate', date)}
                  minDateTime={formik.values.startDate}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                      error: formik.touched.endDate && Boolean(formik.errors.endDate),
                      helperText: formik.touched.endDate && formik.errors.endDate,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Requirements
                </Typography>
                <Box display="flex" gap={1} mb={1}>
                  <TextField
                    fullWidth
                    size="small"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'requirement')}
                    placeholder="Add a requirement"
                    variant="outlined"
                  />
                  <Button 
                    variant="outlined" 
                    onClick={handleAddRequirement}
                    disabled={!requirementInput.trim()}
                  >
                    Add
                  </Button>
                </Box>
                <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                  {Array.isArray(formik.values.requirements) && formik.values.requirements.map((req, index) => {
                    // Ensure req is a string before rendering
                    const requirement = String(req || '');
                    return (
                      <Chip
                        key={index}
                        label={requirement}
                        onDelete={() => handleRemoveRequirement(requirement)}
                        size="small"
                      />
                    );
                  })}
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Tags
                </Typography>
                <Box display="flex" gap={1} mb={1}>
                  <TextField
                    fullWidth
                    size="small"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'tag')}
                    placeholder="Add a tag"
                    variant="outlined"
                  />
                  <Button 
                    variant="outlined" 
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                  >
                    Add
                  </Button>
                </Box>
                <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                  {Array.isArray(formik.values.tags) && formik.values.tags.map((tag, index) => {
                    // Ensure tag is a string before rendering
                    const tagText = String(tag || '');
                    return (
                      <Chip
                        key={index}
                        label={tagText}
                        onDelete={() => handleRemoveTag(tagText)}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    );
                  })}
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Program Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={
                  formik.touched.description
                    ? formik.errors.description
                    : 'Provide a detailed description of the program'
                }
                margin="normal"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={onClose} 
            startIcon={<CancelIcon />}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
            disabled={isSubmitting || !formik.isValid || !formik.dirty}
          >
            {program ? 'Update Program' : 'Create Program'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProgramForm;
