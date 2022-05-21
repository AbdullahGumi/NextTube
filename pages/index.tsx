import type { NextPage } from "next";
import Link from "next/link";
import Meta from "../components/Meta";
import VideoCard from "../components/VideoCard";
const Home: NextPage = () => {
  return (
    <div className="bg-slate-900 h-full p-4">
      <Meta title="NextTube" />
      <div className="flex flex-wrap justify-between gap-4 ">
        {[1, 2, 2, 3, 1, 1, 1, 1, 1].map((_, i) => (
          <Link href="/video" key={i}>
            <a className="contents">
              <VideoCard isRecommended={false} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
