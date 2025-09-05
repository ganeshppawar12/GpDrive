import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const navbar = ({searchTerm,setSearchTerm}) => {
  const [userDetails, setUserdetails] = useState(null);
 const navigate = useNavigate();
   const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickmenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosemenu = () => {
    setAnchorEl(null);
  };
 
 function handelLogout(){
  localStorage.removeItem('token');
localStorage.removeItem('user');
navigate('/login')
 }


 useEffect(()=>{
  const user = JSON.parse(localStorage.getItem('user'));
setUserdetails(()=>user);
//  console.log(userDetails);
 },[])


  return (
    <div className=' border-b-1  border-gray-200' >


    <div  className=' flex items-center justify-between  p-2' >
        <div className=' flex items-center  border-1 rounded-md border-gray-300 p-1 w-64 '>
            <SearchIcon className=' text-gray-400'></SearchIcon>
            <input className='border-0 outline-0 w-100 '  type="text" placeholder='Search for documents & files'  name='search'
            value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)} 
  />
        </div>

        <div>
          <div className=' flex items-center gap-1.5 text-gray-500'>
            <span className=''><HelpOutlineIcon></HelpOutlineIcon></span>
            <span><NotificationsNoneIcon></NotificationsNoneIcon></span>
            <span className=' cursor-pointer  relative '  
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickmenu}
              >
            {
              userDetails ? ( <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-black font-semibold shadow-md ring-1 ring-black">
  {userDetails.name[0]?.toUpperCase()}
</span>) :  (<span><AccountCircleIcon></AccountCircleIcon></span>)
            }
               
                 
          
              
                <div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClosemenu}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem  onClick={handelLogout}>Logout</MenuItem>
      </Menu>
    </div>
              
             
            </span>

          </div>
         
        
           
        </div>
    </div>


    </div>
  )
}

export default navbar
