import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import { FC } from "react";

const ListItem: FC<{ icon: any; text: any }> = ({ icon, text }) => {
  return (
    <li>
      <div className="flex items-center py-2 px-6 hover:bg-slate-400">
        {icon}
        <span className="text-lg text-white font-semibold ml-6">{text}</span>
      </div>
    </li>
  );
};

const LeftPane = () => {
  return (
    <div className="w-2/12 fixed bg-slate-800  h-screen overflow-y-auto">
      <ul>
        <ListItem icon={<HomeIcon sx={{ color: "white" }} />} text="Home" />
        <ListItem
          icon={<ExploreOutlinedIcon sx={{ color: "white" }} />}
          text="Explore"
        />
        <ListItem
          icon={<SubscriptionsOutlinedIcon sx={{ color: "white" }} />}
          text="Subscriptions"
        />
        <ListItem
          icon={<VideoLibraryOutlinedIcon sx={{ color: "white" }} />}
          text="Library"
        />
      </ul>
    </div>
  );
};

export default LeftPane;
