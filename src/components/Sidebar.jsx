import React from 'react'
import Drive from '../img/logo.png'
import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ComputerIcon from '@mui/icons-material/Computer';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from '@mui/material/Button';
import { useAppContext } from './AppContext';


const Sidebar = ({handleOpen}) => {

  const {totalsize} = useAppContext();
  const MAX_STORAGE_MB = 500;
  const percentUsed = Math.min(((totalsize / (1024 * 1024)).toFixed(2) / MAX_STORAGE_MB) * 100, 100).toFixed(2);
  const totalusedStoarge = ((totalsize / (1024 * 1024)).toFixed(2) / MAX_STORAGE_MB) * 100;

  return (
    <div className='w-60 p-2 flex flex-col gap-3 border-r-1 border-gray-300'>


<div  className='flex items-center gap-2'>
    <img className=' w-10 ' src={Drive} alt="Logo" loading='lazy' />
    <p className=' text-2xl text-green-600 font-semibold'>GP Drive</p>
</div>

<Button type="button" onClick={handleOpen} style={{border:'1px solid '}} >
<div className=' text-center'>
    {/* <div > */}
        <div  className=' text-gray-600 cursor-pointer ' ><AddIcon></AddIcon> Add Files</div>
    {/* </div> */}
</div>
</Button>

 <div>
    <ul className='flex flex-col gap-2 text-gray-500 cursor-pointer border-b-2 border-gray-200 ' >
        <li className=' hover:bg-purple-50 rounded-md p-1' ><HomeOutlinedIcon></HomeOutlinedIcon>   <span>Home</span>  </li>
        <li className=' hover:bg-purple-50 rounded-md p-1'><ComputerIcon></ComputerIcon> <span>Computers</span> </li>
        <li className=' hover:bg-purple-50 rounded-md p-1'><NoteOutlinedIcon></NoteOutlinedIcon> <span>Notes</span> </li>
        <li className=' hover:bg-purple-50 rounded-md p-1'><DriveFolderUploadIcon></DriveFolderUploadIcon> <span>Drive</span> </li>
        <li className=' hover:bg-purple-50 rounded-md p-1'><DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon> <span>Trash</span> </li>

    </ul>

 </div>

 <div>

    <p>{(totalsize / (1024 * 1024)).toFixed(2)}MB of {MAX_STORAGE_MB}MB</p>
<div className="w-full bg-gray-200 rounded-full h-3 mt-1">
  <div
    className="bg-blue-600 h-3 rounded-full"
    style={{ width: `${totalusedStoarge}%`  , backgroundColor : totalusedStoarge < 401 ? "blue" : "red" }}
  ></div>
</div>
    
 </div>


    </div>
  )
}

export default Sidebar