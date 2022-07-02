import { signIn, signOut, useSession } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Dispatch, useEffect, useState } from "react";
import UploadVideoModal from "./UploadVideoModal";
import { NEXT_URL } from "../config/config";

const Header = ({
  isOpen,
  setSideBarOpen,
}: {
  isOpen: boolean;
  setSideBarOpen: Dispatch<boolean>;
}) => {
  const { data: session } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      fetch(`${NEXT_URL}/api/users`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: session?.user?.name,
          profilePic: session?.user?.image,
        }),
      });
    }
  }, [session?.user?.name, session?.user?.image]);

  return (
    <>
      <UploadVideoModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      <div className="w-full bg-slate-700 h-14 flex justify-between items-center py-4 px-6">
        <div className="flex justify-between items-center">
          <MenuIcon
            sx={{ color: "white" }}
            className="hover:cursor-pointer"
            onClick={() => setSideBarOpen(!isOpen)}
          />
          <h3 className="pl-5 text-2xl text-white">NextTube</h3>
        </div>
        <div className="flex items-center w-1/2">
          <input className="p-2 w-full" placeholder="Search" type="text" />
          <div className="p-2 bg-slate-200">
            <SearchIcon sx={{ color: "white" }} />
          </div>
        </div>
        {session ? (
          <div className="flex items-center justify-end w-1/6 gap-2">
            <VideoCallOutlinedIcon
              className="hover:cursor-pointer"
              sx={{ color: "white" }}
              onClick={() => setModalOpen(true)}
            />
            <img
              className="rounded-full p-2 w-12 h-12 hover:cursor-pointer"
              src={session.user?.image!}
              alt="profile"
              onClick={() => signOut()}
            />
          </div>
        ) : (
          <div className="w-1/6">
            <button
              onClick={() =>
                signIn("google", { callbackUrl: "http://localhost:3000/" })
              }
              className="flex flex-row border text-white border-white p-2 uppercase gap-3 rounded"
            >
              <AccountCircleOutlinedIcon />
              sign in
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
