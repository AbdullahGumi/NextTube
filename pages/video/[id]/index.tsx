import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Meta from "../../../components/Meta";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import VideoCard from "../../../components/VideoCard";
import Link from "next/link";
import daysjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const Video: NextPage = ({ video, videos }) => {
  const router = useRouter();
  const { id } = router.query;
  // const [isLoading, setLoading] = useState(true);
  // const [videos, setVideos] = useState<any[]>([]);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [likes, setLikes] = useState(0);
  daysjs.extend(relativeTime);

  useEffect(() => {
    setLikes(video.likes);
  }, [video]);

  const likeVideo = (increment) => {
    setLikes(increment ? likes + 1 : likes - 1);
    setLikeClicked(!likeClicked);
    fetch(`http://localhost:3000/api/videos/likes/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        incrementLike: increment ? true : false,
      }),
    });
  };

  return (
    <div className="bg-slate-900 h-full p-4">
      <Meta title={video.title} />
      <div className="flex flex-row gap-4">
        <div className="w-4/6 flex flex-col ">
          <video
            controls
            width="100%"
            style={{
              background: `transparent url(${video.thumbnail}) no-repeat 00`,
              backgroundSize: "cover",
              width: "100%",
              height: "500px",
            }}
            poster={video.thumbnail}
          >
            <source src={video.video} type="video/mp4"></source>
          </video>
          <div className="flex flex-col mt-3 flex-1">
            <h1 className="text-white text-xl">{video.title}</h1>
            <div className="flex flex-row justify-between items-center mt-2">
              <div style={{ color: "#aaa" }} className=" flex flex-col">
                <div className="flex flex-row items-center">
                  <span className="text-sm">
                    {video.views} views {daysjs(video.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="flex flex-row items-center">
                  {likeClicked ? (
                    <ThumbUpIcon
                      onClick={() => likeVideo(false)}
                      className="hover:cursor-pointer"
                      sx={{ color: "white" }}
                    />
                  ) : (
                    <ThumbUpOutlinedIcon
                      onClick={() => likeVideo(true)}
                      className="hover:cursor-pointer"
                      sx={{ color: "white" }}
                    />
                  )}

                  <span className="text-white text-base ml-2">{likes}</span>
                </div>
                <div className="flex flex-row items-center ml-3">
                  {dislikeClicked ? (
                    <ThumbDownIcon
                      onClick={() => setDislikeClicked(!dislikeClicked)}
                      className="hover:cursor-pointer"
                      sx={{ color: "white" }}
                    />
                  ) : (
                    <ThumbDownOutlinedIcon
                      onClick={() => setDislikeClicked(!dislikeClicked)}
                      className="hover:cursor-pointer"
                      sx={{ color: "white" }}
                    />
                  )}
                  <span className="text-white text-base ml-2">DISLIKE</span>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex flex-row justify-between gap-5">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://yt3.ggpht.com/ytc/AKedOLTZzZv60B1v76eOC7TsEYZD_TMH2-H5KeYxkfXGBQ=s48-c-k-c0x00ffffff-no-rj"
                alt="profile"
              />
              <div className="flex flex-col justify-between flex-1">
                <div className=" flex flex-col">
                  <div className="flex flex-row items-center mt-1">
                    <span className="text-sm text-white">Netflix</span>
                    <CheckCircleIcon
                      sx={{
                        width: "15px",
                        height: "15px",
                        ml: "5px",
                        color: "white",
                      }}
                    />
                  </div>
                  <div className="flex flex-row items-center ">
                    <span style={{ color: "#aaa" }} className="text-sm">
                      23.6M subscribers
                    </span>
                  </div>
                </div>
                <span className="text-white mt-4 ">{video.desc}</span>
              </div>
              <div className="hover:cursor-pointer bg-red-600 p-2 text-white font-semibold h-fit rounded-md">
                SUBSCRIBE
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 flex flex-col gap-2 ">
          {videos.map(
            (video, i) =>
              video._id !== id && (
                <Link href={`/video/${video._id}`} key={i}>
                  <a className="contents">
                    <VideoCard key={i} isRecommended={true} video={video} />
                  </a>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  //get single video
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/videos/${id}`);
  const videoData = await res.json();
  const video = videoData.payload;

  // update number of views
  await fetch(`http://localhost:3000/api/videos/views/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
  });

  //get all videos
  const videosRes = await fetch("http://localhost:3000/api/videos");
  const videosData = await videosRes.json();
  const videos = videosData.payload;

  return { props: { video, videos } };
}

export default Video;
