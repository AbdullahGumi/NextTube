import { Key, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Meta from "../../../components/Meta";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VideoCard from "../../../components/VideoCard";
import Link from "next/link";
import daysjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NEXT_URL } from "../../../config/config";

interface IProps {
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
  user: {
    username: string;
    profilePic: string;
    subscribers: Number;
    videos: Array<string>;
  };
  videos: Array<video>;
}

const Video: NextPage = ({ video, videos, user }: IProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [likes, setLikes] = useState(0);
  const [numOfSubscriptions, setNumOfSubscriptions] = useState(0);

  const [numOfViews, setNumOfViews] = useState(0);
  daysjs.extend(relativeTime);

  useEffect(() => {
    console.log("user", user);
    console.log("video", video);
    console.log("videos", videos);
    setLikes(video.likes);
    setNumOfSubscriptions(user.subscribers);
    setNumOfViews(video.views);
  }, [user, video]);

  const likeVideo = (increment: boolean) => {
    setLikes(increment ? likes + 1 : likes - 1);
    setLikeClicked(!likeClicked);
    fetch(`${NEXT_URL}/api/videos/likes/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        incrementLike: increment ? true : false,
      }),
    });
  };

  const subscribe = (isSubscribed: boolean) => {
    fetch(`${NEXT_URL}/api/users/subscribe/${user._id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        incrementSub: isSubscribed,
      }),
    }).then(() => {
      setNumOfSubscriptions(
        isSubscribed ? numOfSubscriptions + 1 : numOfSubscriptions - 1
      );
      setSubscribed(!subscribed);
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
                    {/* {number of views + 1 because the server updates the views
                    on component mount but the ui remains with the old value} */}
                    {numOfViews + 1} views {daysjs(video.createdAt).fromNow()}
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
                src={user.profilePic}
                alt="profile"
              />
              <div className="flex flex-col justify-between flex-1">
                <div className=" flex flex-col">
                  <div className="flex flex-row items-center mt-1">
                    <span className="text-sm text-white">{video.user}</span>
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
                      {numOfSubscriptions} subscribers
                    </span>
                  </div>
                </div>
                <span className="text-white mt-4 ">{video.desc}</span>
              </div>
              {subscribed ? (
                <button
                  onClick={() => subscribe(false)}
                  className={`hover:cursor-pointer hover:bg-slate-400 bg-slate-600 p-2 text-white font-semibold h-fit rounded-md`}
                >
                  SUBSCRIBED
                </button>
              ) : (
                <button
                  onClick={() => subscribe(true)}
                  className={`hover:cursor-pointer hover:bg-red-500 bg-red-600
                 p-2 text-white font-semibold h-fit rounded-md`}
                >
                  SUBSCRIBE
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-4/12 flex flex-col gap-4 ">
          {videos.map(
            (
              video: { _id: string | string[] | undefined },
              i: Key | null | undefined
            ) =>
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

export async function getServerSideProps(context: any) {
  //get single video
  const id = context.params.id;
  const res = await fetch(`${NEXT_URL}/api/videos/${id}`);
  const videoData = await res.json();
  const { video, user } = videoData.payload;

  // update number of views
  await fetch(`${NEXT_URL}/api/videos/views/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
  });

  //get all videos
  const videosRes = await fetch(`${NEXT_URL}/api/videos`);
  const videosData = await videosRes.json();
  const videos = videosData.payload;

  return { props: { video, videos, user } };
}

export default Video;
