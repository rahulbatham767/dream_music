import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <ul className="menu  menu-horizontal  ml-5   ">
      <li>
        <Link href={"/"}>Music</Link>
      </li>
      <li>
        <Link href={"/"}>Podcast</Link>
      </li>
      <li>
        <Link href={"/"}>Live</Link>
      </li>{" "}
      <li>
        <Link href={"/"}>Radio</Link>
      </li>
      <li>
        <label className="input input-sm shadow flex lg:w-64 md:w-52 lg:w-[25rem] w-[10rem] md:w-34 items-center gap-2 bg-base-300">
          <input
            type="text"
            className="grow w-full   input-sm"
            placeholder="Michael Jackson"
            aria-label="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </li>
    </ul>
  );
};

export default Navbar;
