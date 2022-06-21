import { useRouter } from "next/router";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import { FC } from "react";

const ListItem: FC<{ icon: any; text: any; href: any }> = ({
  icon,
  text,
  href,
}) => {
  const router = useRouter();
  return (
    <li>
      <Link href={href}>
        <div
          className={`flex items-center py-2 px-6 hover:bg-slate-400 hover:cursor-pointer ${
            router.asPath === href && "bg-slate-400"
          }`}
        >
          {icon}
          <span className="text-lg text-white font-semibold ml-6">{text}</span>
        </div>
      </Link>
    </li>
  );
};

const LeftPane = ({ isOpen }: { isOpen: boolean }) => {
  const menuItems = [
    {
      href: "/",
      title: "Home",
      icon: <HomeIcon sx={{ color: "white" }} />,
    },
    {
      href: "/explore",
      title: "Explore",
      icon: <ExploreOutlinedIcon sx={{ color: "white" }} />,
    },
    {
      href: "/subscriptions",
      title: "Subscriptions",
      icon: <SubscriptionsOutlinedIcon sx={{ color: "white" }} />,
    },
    ,
    {
      href: "/library",
      title: "Library",
      icon: <VideoLibraryOutlinedIcon sx={{ color: "white" }} />,
    },
  ];

  const renderMenuItems = () => {
    return menuItems.map(({ href, title, icon }: any, i) => (
      <ListItem key={i} href={href} icon={icon} text={title} />
    ));
  };

  return (
    <div className={`bg-slate-800 ${!isOpen && "hidden"}`}>
      <nav>
        <ul>{renderMenuItems()}</ul>
      </nav>
    </div>
  );
};

export default LeftPane;
