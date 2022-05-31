import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Link from "next/link";
import Meta from "../components/Meta";
import CircularProgress from "@mui/material/CircularProgress";
import VideoCard from "../components/VideoCard";
const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then((res) => res.json())
      .then((fin) => {
        setVideos(fin.payload);
        fin.status === "success" && setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="bg-slate-900 h-full p-4">
      <Meta title="NextTube" />
      <div className="flex flex-wrap justify-between gap-4 ">
        {isLoading ? (
          <CircularProgress />
        ) : (
          videos.map((video) => (
            <Link href={`/video/${video._id}`} key={video._id}>
              <a className="contents">
                <VideoCard isRecommended={false} video={video} />
              </a>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
