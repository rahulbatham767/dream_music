"use client";

import React, { useState } from "react";
import LeftNavbar from "./LeftNavbar";
import Navbar from "./Navbar";
import Player from "./Player";

export default function ClientLayout({ children }) {
  const [playerData, setPlayerData] = useState(null);

  return (
    <div className="flex  ">
      <div className="flex flex-1 h-full">
        <div className="left-navbar fixed top-0 left-0 w-56 h-full">
          <LeftNavbar />
        </div>
        <div className="flex-1 ml-56">
          <Navbar />
          <div className="p-4">
            {React.cloneElement(children, { setPlayerData })}
          </div>
        </div>{" "}
      </div>
      <div className="flex-1 flex items-end mb-4 hidden lg:flex">
        <Player data={playerData} />
      </div>
    </div>
  );
}
