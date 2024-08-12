import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoMdTrendingUp } from "react-icons/io";

import { FaMusic } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";

const LeftNavbar = () => {
  return (
    <div className=" menu-vertical p-3   ">
      <div className="logo flex items-center">
        <span>
          <Image src={"/vector.png"} width={20} height={20} />
        </span>
        <h3 className="md:text-2xl text-lg ml-2">
          <span className="text-red-500 "> Dream</span>
          <span className="">Music</span>{" "}
        </h3>
      </div>
      <div>
        <ul className="menu h-72">
          <li className="ml-4">Menu</li>
          <li>
            <Link href={"/"}>
              <span className="icon">
                {" "}
                <IoMdHome />{" "}
              </span>{" "}
              Home
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <span className="icon">
                {" "}
                <IoMdTrendingUp />{" "}
              </span>
              Trends
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <span className="icon">
                {" "}
                <FaMusic />
              </span>
              Library
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <span className="icon">
                {" "}
                <RiCompassDiscoverFill />{" "}
              </span>{" "}
              Discover
            </Link>
          </li>
        </ul>
      </div>

      <div className="menu">
        <p className="ml-4">General</p>
        <li>
          <Link href={"/"}>
            <span className="icon">
              {" "}
              <IoMdSettings />
            </span>
            Settings
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <span className="icon">
              {" "}
              <FiLogOut />{" "}
            </span>{" "}
            Log Out
          </Link>
        </li>
      </div>
    </div>
  );
};

export default LeftNavbar;
