import { useState } from "react";
import Header from "./Header";
import LeftPane from "./LeftPane";
export default function Layout({ children }: { children: any }) {
  const [isSideBarOpen, setSideBarOpen] = useState(true);
  return (
    <div className="min-h-screen flex flex-col">
      <Header isOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} />
      <div className="flex flex-col md:flex-row flex-1">
        <LeftPane isOpen={isSideBarOpen} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
