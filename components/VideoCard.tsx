import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import daysjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const VideoCard = ({ isRecommended, video }) => {
  daysjs.extend(relativeTime);

  return (
    <div
      className={`${isRecommended ? "w-full" : "w-1/5"} ${
        isRecommended ? "" : "h-1/3"
      }  flex ${!isRecommended && "flex-col"} hover:cursor-pointer gap-3`}
    >
      <img
        style={{
          width: isRecommended ? "168px" : "250px",
          height: isRecommended ? "94px" : "142px",
        }}
        className="object-cover"
        src={video.thumbnail}
        alt="image"
      />
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
            {video.title}
          </span>
          <div style={{ color: "#aaa" }} className=" flex flex-col">
            <div className="flex flex-row items-center mt-1">
              <span className="text-sm">{video.user}</span>
              <CheckCircleIcon
                sx={{ width: "15px", height: "15px", ml: "5px" }}
              />
            </div>
            <div className="flex flex-row items-center">
              <span className="text-sm">
                {video.views} Views • {daysjs(video.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
        <MoreVertIcon sx={{ color: "white" }} />
      </div>
    </div>
  );
};

export default VideoCard;
