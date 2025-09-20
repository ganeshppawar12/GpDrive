import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalsize , setTotalsize] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AppContext.Provider
      value={{
        open,
        setOpen,
        handleOpen,
        handleClose,
        uploading,
        setUploading,
        searchTerm,
        setSearchTerm,
        totalsize,
        setTotalsize,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
