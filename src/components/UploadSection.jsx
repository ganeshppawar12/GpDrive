import React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';


const UploadSection = ({handleOpen }) => {
 

  return (

    <>
    <div>
      <div className=" flex items-center justify-between  p-2 text-gray-500 text-sm border-b-1 border-gray-200" >
        <div className=" flex items-center gap-2">
          <input  className=" border-1 border-gray-300 p-2 rounded-sm " name="date"  type="date" />
          <span className=" text-gray-200 ">|</span>
          <div className=" flex items-center border-1 border-gray-300 p-1 rounded-sm gap-1.5 ">
            <span>
              <FilterListIcon></FilterListIcon>
            </span>
            <p>Sort</p>
          </div>
        </div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

        <Button type="button" onClick={handleOpen} >
        <div className="flex items-center justify-center bg-blue-500 text-white p-1 rounded-md text-sm ">
            <div className="px-1"> <span><AddIcon></AddIcon></span> Upload Files </div>
        </div>
      </Button>
        
      </div>
    </div>
    <div>
     
      
    </div>
  </>
  );
};



export default UploadSection;
