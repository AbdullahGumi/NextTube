import type { NextPage } from "next";
import Meta from "../components/Meta";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
const Video: NextPage = () => {
  return (
    <div className="bg-slate-900 h-full p-4">
      <Meta title="First video" />
      <div className="flex flex-row">
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
            <hr className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
