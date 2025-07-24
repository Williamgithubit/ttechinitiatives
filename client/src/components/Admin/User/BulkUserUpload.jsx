import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';
import * as XLSX from 'xlsx';
import { Box, Button, Card, CardContent, CircularProgress, Typography, Link, Stack } from '@mui/material';
import { Publish as PublishIcon, CloudUpload as CloudUploadIcon, GetApp as GetAppIcon } from '@mui/icons-material';
import { useBulkImportUsersMutation } from '../../../store/Admin/userManagementApi';

const BulkUserUpload = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [bulkImportUsers] = useBulkImportUsersMutation();

  const processFile = useCallback((acceptedFile) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length === 0) {
          enqueueSnackbar('The file is empty', { variant: 'warning' });
          return;
        }
        
        setFile(acceptedFile);
        enqueueSnackbar(`Found ${jsonData.length} records to import`, { variant: 'info' });
      } catch (error) {
        enqueueSnackbar('Error processing file. Please ensure it is a valid Excel/CSV file.', {
          variant: 'error',
        });
      }
    };
    
    reader.onerror = () => {
      enqueueSnackbar('Error reading file. Please try again.', { variant: 'error' });
    };
    
    reader.readAsArrayBuffer(acceptedFile);
  }, [enqueueSnackbar]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        processFile(acceptedFiles[0]);
      }
    },
  });

  const handleUpload = async () => {
    if (!file) return;
    
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      
      const result = await bulkImportUsers(formData).unwrap();
      
      enqueueSnackbar(
        `Successfully created ${result.created} users. ${result.failed > 0 ? `${result.failed} users failed.` : ''}`,
        { variant: 'success' }
      );
      
      setFile(null);
    } catch (error) {
      enqueueSnackbar(error.data?.message || 'Error uploading file', { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Bulk User Upload
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Upload a CSV or Excel file to create multiple users at once. The file should include columns for email, name, role, and phone (optional).
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            component="a"
            href="/templates/user_bulk_upload_template.csv"
            download="user_bulk_upload_template.csv"
            startIcon={<GetAppIcon />}
          >
            Download Template
          </Button>
          <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
            Download our template to ensure proper formatting
          </Typography>
        </Stack>
        
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragActive ? 'action.hover' : 'background.paper',
            mb: 2,
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
          <Typography>
            {isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Supports .xlsx, .xls, .csv (Max 5MB)
          </Typography>
        </Box>
        
        {file && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PublishIcon sx={{ mr: 1 }} />
            <Typography variant="body2">
              {file.name} ({Math.round(file.size / 1024)} KB)
            </Typography>
          </Box>
        )}
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || isUploading}
          startIcon={isUploading ? <CircularProgress size={20} /> : <PublishIcon />}
        >
          {isUploading ? 'Uploading...' : 'Upload Users'}
        </Button>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            File Format Example:
          </Typography>
          <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, overflowX: 'auto' }}>
            email,name,role,phone
            user1@example.com,John Doe,student,1234567890
            user2@example.com,Jane Smith,teacher,0987654321
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BulkUserUpload;
