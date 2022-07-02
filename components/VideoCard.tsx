import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import daysjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface Iprops {
  video: {
    user: string;
    title: string;
    desc: string;
    video: string;
    thumbnail: string;
    views: Number;
    likes: Number;
    dislikes: Number;
    profilePic: string;
    createdAt: string;
    updatedAt: string;
  };
  isRecommended: boolean;
}

const VideoCard = ({ isRecommended, video }: Iprops) => {
  daysjs.extend(relativeTime);

  return (
    <div
      className={`flex ${
        !isRecommended && "flex-col"
      } hover:cursor-pointer gap-3`}
    >
      <img
        style={{
          width: isRecommended ? "168px" : "250px",
          height: isRecommended ? "94px" : "142px",
        }}
        className="object-cover rounded-md"
        src={video.thumbnail}
        alt="image"
      />
      <div className="flex flex-row justify-between items-start gap-2">
        <img
          className={`rounded-full w-8 h-8 object-cover  ${
            isRecommended && "hidden"
          }`}
          src={video.profilePic}
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
              <span className="text-sm">{video.views.toString()}</span>
              <span className="text-sm mx-1"> Views • </span>
              <span className="text-sm">
                {daysjs(video.createdAt).fromNow()}
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
