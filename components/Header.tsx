import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useState } from "react";
import UploadVideoModal from "./UploadVideoModal";

const Header = ({ isOpen, setSideBarOpen }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <UploadVideoModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      <div className="w-full bg-slate-700 h-14 flex justify-between items-center py-4 px-6">
        <div className="flex justify-between items-center">
          <MenuIcon
            sx={{ color: "white" }}
            className="hover:cursor-pointer"
            onClick={() => setSideBarOpen(!isOpen)}
          />
          <h3 className="pl-5 text-2xl text-white">NextTube</h3>
        </div>
        <div className="flex items-center w-1/2">
          <input className="p-2 w-full" placeholder="Search" type="text" />
          <div className="p-2 bg-slate-200">
            <SearchIcon sx={{ color: "white" }} />
          </div>
          <div className="rounded-full bg-black p-2 ml-2">
            <MicIcon sx={{ color: "white" }} />
          </div>
        </div>
        <div className="flex items-center justify-between w-1/6">
          <VideoCallOutlinedIcon
            className="hover:cursor-pointer"
            sx={{ color: "white" }}
            onClick={() => setModalOpen(true)}
          />
          <AppsOutlinedIcon sx={{ color: "white" }} />
          <NotificationsNoneOutlinedIcon sx={{ color: "white" }} />
          <img
            className="rounded-full p-2 w-12 h-12"
            src="https://yt3.ggpht.com/yti/APfAmoGoY3ePenKwccHJOwl2DAHDj806V-hhhXts4sPsfA=s88-c-k-c0x00ffffff-no-rj-mo"
            alt="profile"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
