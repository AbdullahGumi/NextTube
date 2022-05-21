import type { NextPage } from "next";
import Meta from "../components/Meta";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VideoCard from "../components/VideoCard";
import Link from "next/link";

const Video: NextPage = () => {
  return (
    <div className="bg-slate-900 h-full p-4">
      <Meta title="First video" />
      <div className="flex flex-row gap-4">
        <div className="w-4/6">
          <video controls muted width="100%" height="100%">
            <source src="http://localhost:4000/video" type="video/mp4"></source>
          </video>
          <div className="flex flex-col mt-3">
            <h1 className="text-white text-xl">
              Spiderhead | Chris Hemsworth | Official Trailer | Netflix
            </h1>
            <div className="flex flex-row justify-between items-center mt-2">
              <div style={{ color: "#aaa" }} className=" flex flex-col">
                <div className="flex flex-row items-center">
                  <span className="text-sm">4,018,785 views17 May 2022</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="flex flex-row items-center">
                  <ThumbUpOutlinedIcon
                    className="hover:cursor-pointer"
                    sx={{ color: "white" }}
                  />
                  <span className="text-white text-base ml-2">93K</span>
                </div>
                <div className="flex flex-row items-center ml-3">
                  <ThumbDownOutlinedIcon
                    className="hover:cursor-pointer"
                    sx={{ color: "white" }}
                  />
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
              <div className="flex flex-col justify-between">
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
                  <div className="flex flex-row items-center">
                    <span style={{ color: "#aaa" }} className="text-sm">
                      23.6M subscribers
                    </span>
                  </div>
                </div>
                <span className="text-white mt-4 ">
                  Two inmates (Miles Teller & Jurnee Smollett) form a connection
                  while grappling with their pasts in a state-of-the-art
                  penitentiary run by a brilliant visionary (Chris Hemsworth)
                  who experiments on his subjects with mind-altering drugs.
                  Directed by Joseph Kosinski (Top Gun: Maverick, Tron: Legacy).{" "}
                </span>
              </div>
              <div className="hover:cursor-pointer bg-red-600 p-2 text-white font-semibold h-fit rounded-md">
                SUBSCRIBE
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 flex flex-col gap-2 ">
          {[1, 2, 3, 4, 5, 6, 7, 7, 77, 7, 7, 7].map((_, i) => (
            <Link href="/video" key={i}>
              <a className="contents">
                <VideoCard key={i} isRecommended={true} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
