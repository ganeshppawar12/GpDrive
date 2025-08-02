import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius : '20px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function NestedModal({open ,handleClose , uploading ,setUploading,setOpen}) {

  const [file, setFile] = useState(null);

  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) return setMessage('Please select a file.');

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');

    try {
      setUploading(true);
      const res = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('✅ File uploaded successfully!');
      setFile(null);
      
      // onSuccess(); // Refresh file list on success
    } catch (err) {
      setMessage('❌ Upload failed: ' + (err.response?.data?.message || 'Error'));
    } finally {
      setUploading(false);
      setOpen(false);
      setMessage('');

    }
  };

  return (
    <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500}}>
          <div className='flex flex-col items-start gap-2' >

        <h2 className=' text-black font-bold my-3 ' id="parent-modal-title">Upload File</h2>
      
           <input className=' border-gray-300 border-2 p-1 rounded-xl my-1 ' type="file" name='file' onChange={handleFileChange} />
           <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
          </div>
         
      
        </Box>
      </Modal>
    </div>
  );
}