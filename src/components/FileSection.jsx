import React, { useEffect, useState } from 'react'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import axios from 'axios';
import { useAppContext } from './AppContext';
const FileSection = ({uploading , searchTerm}) => {

 const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
 const [viewType, setViewType] = useState("list"); 
  const api = import.meta.env.VITE_API_URL;
 const {searchQuery,setSearchQuery } = useAppContext();



    useEffect(() => {
 
    const fetchFiles = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;
      try {
        const res = await axios.get(`${api}/api/files`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch files");
      }
    };

    fetchFiles();
  }, [uploading]);
  
  

// Delete Functionality


const handleDelete = async (id) => {
  const token = localStorage.getItem('token');
  const confirmed = window.confirm("Are you sure you want to delete this file?");
  if (!confirmed) return;

  try {
    await axios.delete(`${api}/api/files/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFiles(prev => prev.filter(file => file._id !== id)); // Update UI
  } catch (err) {
    alert("Failed to delete file");
  }
};



// update Funtinality


const handleRename = async (id) => {
  const newName = prompt("Enter new file name:");
  if (!newName) return;
  const token = localStorage.getItem('token');

  try {
    const res = await axios.put(`${api}/api/files/${id}/rename`, {
      newName
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setFiles(prev =>
      prev.map(file => (file._id === id ? res.data.file : file))
    );
  } catch (err) {
    alert("Failed to rename file");
  }
};


const [openMenu, setOpenMenu] = useState(null);

const toggleMenu = (id) => {
  setOpenMenu(prev => (prev === id ? null : id));
};

const handleDownload = (url) => {
  window.open(url, '_blank');
};



 const filteredFiles = files.filter(file =>
    file?.filename?.toLowerCase().includes(searchQuery.toLowerCase())
 )

  return (

    <>
    <div  className='flex items-center justify-between p-2' >

        <div></div>
        <div className='flex items-center px-2 py-1 gap-2 text-gray-500 border-1 border-gray-300 rounded-md'>
           
                <button className=' flex items-center cursor-pointer  ' onClick={() => setViewType("list")}>
                <span style={{color : viewType == 'list' ? '#6c9cff' : '' ,}} ><FormatListBulletedOutlinedIcon></FormatListBulletedOutlinedIcon></span>
                <p style={{color : viewType == 'list' ? '#6c9cff' : ''}} >List</p>
                </button>
           
            <span>|</span>
            <button className=' flex items-center  cursor-pointer' onClick={() => setViewType("grid")}>
                <span style={{color : viewType == 'grid' ? '#6c9cff' : '' ,}} ><GridViewOutlinedIcon></GridViewOutlinedIcon></span>
                <p style={{color : viewType == 'grid' ? '#6c9cff' :'' }} >Grid</p>
            </button>
        </div>
    </div>

    <div className='p-2'>

    
    <div className="overflow-x-auto rounded-2xl border-1 border-gray-100">
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) :
    ( viewType === "list" ?
   <table className="min-w-full border-separate border-spacing-y-2">
  <thead>
    <tr className="text-sm text-gray-600 bg-blue-50">
      <th className="px-4 py-2 text-left rounded-l-lg">File Name</th>
      <th className="px-4 py-2 text-left">Uploaded</th>
      <th className="px-4 py-2 text-left">Type</th>
      <th className="px-4 py-2 text-left">Size</th>
      <th className="px-4 py-2 text-left rounded-r-lg">Link</th>
      <th className="px-4 py-2 text-right"></th>  {/* Empty column for menu */}

    </tr>
  </thead>
  <tbody>
    {filteredFiles.map((file) => {
      const fileSizeInMB = file.size / (1024 * 1024);
      const displaySize =
        fileSizeInMB < 1
          ? `${(file.size / 1024).toFixed(2)} KB`
          : `${fileSizeInMB.toFixed(2)} MB`;

      const extension = file.filename.split('.').pop().toUpperCase();
      const formattedDate = new Date(file.createdAt).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      return (
        <tr
          key={file._id}
          className="bg-white text-sm text-gray-800 shadow-sm hover:shadow-md transition rounded-lg"
        >
          <td className="px-4 py-3 rounded-l-lg">
            <div className="flex items-center gap-2">
              <div className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                {extension}
              </div>
              <span className="truncate max-w-[180px]">{file.filename}</span>
            </div>
          </td>

          <td className="px-4 py-3 text-gray-500">{formattedDate}</td>

          <td className="px-4 py-3 capitalize text-gray-600">{file.type}</td>

          <td className="px-4 py-3 text-gray-600">{displaySize}</td>

          <td className="px-4 py-3 rounded-r-lg">
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              View
            </a>
          </td>
<td className="px-4 py-3 text-right relative">
  <div className="relative inline-block text-left">
    <button
      onClick={() => toggleMenu(file._id)}
      className="text-gray-600 hover:text-black focus:outline-none"
    >
      ⋮
    </button>

    {/* Dropdown */}
    {openMenu === file._id && (
      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-10">
        <button
          onClick={() => handleDownload(file.url)}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        >
          ⬇️ Download
        </button>
        <button
          onClick={() => handleDelete(file._id)}
          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
        >
          🗑️ Delete
        </button>
      </div>
    )}
  </div>
</td>



        </tr>
      );
    })}
  </tbody>
</table>


    :
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 m-3">
  {files.map((file) => {
    const ext = file.filename.split('.').pop().toLowerCase();

    // Determine color class
    const extColorMap = {
      jpg: 'bg-green-100 text-green-700',
      jpeg: 'bg-green-100 text-green-700',
      png: 'bg-green-100 text-green-700',
      pdf: 'bg-red-100 text-red-700',
      doc: 'bg-indigo-100 text-indigo-700',
      docx: 'bg-indigo-100 text-indigo-700',
      txt: 'bg-indigo-100 text-indigo-700',
      mp4: 'bg-purple-100 text-purple-700',
      mov: 'bg-purple-100 text-purple-700',
      zip: 'bg-orange-100 text-orange-700',
      rar: 'bg-orange-100 text-orange-700',
    };

    const badgeClass = extColorMap[ext] || 'bg-gray-200 text-gray-700';
    const extension = ext.toUpperCase();

    return (
      <div
        key={file._id}
        className="bg-white rounded-xl shadow-sm overflow-hidden transition hover:shadow-md"
      >
        {/* Top Thumbnail */}
        <div className="h-24 bg-gray-100 flex items-center justify-center">
          {file.type === "image" ? (
            <img src={file.url} alt={file.filename} className="h-full w-full object-cover" />
          ) : (
            <span className="text-3xl text-gray-600">📄</span>
          )}
        </div>

        {/* Info */}
        <div className="p-2 text-sm">
          {/* Extension Badge with Color */}
          <span className={`text-[10px] px-2 py-0.5 rounded-full inline-block mb-1 ${badgeClass}`}>
            {extension}
          </span>

          <p className="font-medium text-gray-800 truncate mt-1"> <a href={file.url}
              target="_blank"> {file.filename}</a> </p>
          <p className="text-[11px] text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <div className="flex justify-between mt-2">
            <button
              onClick={() => handleRename(file._id)}
              className="text-yellow-600 text-[11px] hover:underline"
            >
              Rename
            </button>
            <button
              onClick={() => handleDelete(file._id)}
              className="text-red-600 text-[11px] hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  })}
</div>







  )
  }

  
  </div>
  </div>

</>
  )
}

export default FileSection
