import { useContext, useEffect, useState } from "react";

import type { NextPage } from "next";
import Link from "next/link";
import Meta from "../components/Meta";
import VideoCard from "../components/VideoCard";
import LoadingVideoCard from "../components/LoadingVideoCard";
import { NEXT_URL } from "../config/config";
import { SearchContext } from "./_app";
const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const { search }: any = useContext(SearchContext);
  useEffect(() => {
    fetch(`${NEXT_URL}/api/videos`)
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
      <div className="flex flex-wrap justify-around gap-5 sm:gap-12 ">
        {isLoading
          ? [...new Array(20)].map((_, i) => <LoadingVideoCard key={i} />)
          : videos.map(
              (video: any) =>
                video.title.toLowerCase().includes(search.toLowerCase()) && (
                  <Link href={`/video/${video._id}`} key={video._id}>
                    <a className="contents">
                      <VideoCard isRecommended={false} video={video} />
                    </a>
                  </Link>
                )
            )}
      </div>
    </div>
  );
};

export default Home;
