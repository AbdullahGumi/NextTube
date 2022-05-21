import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const VideoCard = ({ isRecommended }) => {
  return (
    <div
      className={`${isRecommended ? "w-full" : "w-1/4"} ${
        isRecommended ? "" : "h-1/3"
      }  flex ${!isRecommended && "flex-col"} hover:cursor-pointer gap-3`}
    >
      <div>
        <img
          src="https://i.ytimg.com/vi/BfsNfFoA0J0/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAKrm-sxjGPKqDktDdt_JxXtTN0XA"
          alt="image"
        />
      </div>
      <div className="flex flex-row justify-start items-start gap-2">
        <img
          className={`rounded-full w-8 h-8 object-cover  ${
            isRecommended && "hidden"
          }`}
          src="https://yt3.ggpht.com/ytc/AKedOLTZzZv60B1v76eOC7TsEYZD_TMH2-H5KeYxkfXGBQ=s68-c-k-c0x00ffffff-no-rj"
          alt="profile"
        />
        <div className="flex flex-col justify-between">
          <span
            className={`${
              isRecommended ? "" : "text-lg"
            } font-medium text-white`}
            style={{ lineHeight: "1.2" }}
          >
            The Recession That Will Change A Generation
          </span>
          <div style={{ color: "#aaa" }} className=" flex flex-col">
            <div className="flex flex-row items-center mt-1">
              <span className="text-sm">Netflix</span>
              <CheckCircleIcon
                sx={{ width: "15px", height: "15px", ml: "5px" }}
              />
            </div>
            <div className="flex flex-row items-center">
              <span className="text-sm">4M Views • 3 days ago</span>
            </div>
          </div>
        </div>
        <MoreVertIcon sx={{ color: "white" }} />
      </div>
    </div>
  );
};

export default VideoCard;
