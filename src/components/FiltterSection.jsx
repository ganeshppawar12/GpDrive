import React, { useEffect, useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import ArticleIcon from "@mui/icons-material/Article";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import axios from 'axios';
import { useAppContext } from "./AppContext";

const FiltterSection = ({ uploading }) => {
 const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const {setTotalsize} = useAppContext()
  const api = import.meta.env.VITE_API_URL;
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


  // ✅ Step 2: Count types
  const typeStats = {
  image: { count: 0, size: 0 },
  video: { count: 0, size: 0 },
  application: { count: 0, size: 0 },
  other: { count: 0, size: 0 },
};

let newTotal = 0;

files.forEach((file) => {
  const type = file.type?.toLowerCase();
  const key = typeStats[type] ? type : 'other';

  typeStats[key].count++;
  typeStats[key].size += file.size;

  newTotal += file.size; // add up sizes
});

setTotalsize(newTotal);

  // ✅ Step 3: Updated filter array (with real counts)
const filtters = [
  {
    id: "1",
    image: <InsertPhotoIcon />,
    titel: "Image Files",
    count: typeStats.image.count,
    size: typeStats.image.size,
    color: "red",
  },
  {
    id: "2",
    image: <VideoChatIcon />,
    titel: "Video Files",
    count: typeStats.video.count,
    size: typeStats.video.size,
    color: "green",
  },
  {
    id: "3",
    image: <ArticleIcon />,
    titel: "Document Files",
    count: typeStats.application.count,
    size: typeStats.application.size,
    color: "gold",
  },
  {
    id: "4",
    image: <BackupTableIcon />,
    titel: "Other Files",
    count: typeStats.other.count,
    size: typeStats.other.size,
    color: "blue",
  },
];



  return (
    <div>
      <div className="flex items-center justify-between bg-blue-50 p-2 flex-wrap">
        {filtters.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-white p-3 border border-gray-300 rounded-lg w-64 gap-2"
          >
            <div className="flex gap-1">
              <div className="border border-gray-300 p-1 rounded-md flex items-center">
                <p className="" style={{ color: item.color }}>
                  {item.image}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">{item.titel}</p>
                <span className="text-gray-400">{item.count}</span>
              </div>
            </div>
            <div className="h-1 bg-gray-200 rounded-2xl">
              <div
                className="h-1 w-50 rounded-2xl"
                style={{ background: item.color }}
              ></div>
            </div>
            <div>
              <p className="text-xs text-gray-400"> {item.count} files • {(item.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltterSection;
