import React, { useState } from "react";
import Navbar from "./Navbar";
import FilterSection from "./FiltterSection";
import Sidebar from "./Sidebar";
import FileSection from "./FileSection";
import UploadModal from "./UploadModal";
import { useAppContext } from "./AppContext";
import UploadSection from "./uploadSection";

const Dashboard = () => {
  const { open, handleOpen, handleClose, setOpen, searchTerm, setSearchTerm } = useAppContext();
  const [totalSize, setTotalSize] = useState(0);
  const [uploading, setUploading] = useState(false);

  return (
    <div className="flex">
      <Sidebar handleOpen={handleOpen} totalSize={totalSize} />
      <div className="flex-1">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <UploadSection handleOpen={handleOpen} />
        <FilterSection uploading={uploading} />
        <FileSection uploading={uploading} searchTerm={searchTerm} />
        <UploadModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          uploading={uploading}
          setUploading={setUploading}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default Dashboard;
