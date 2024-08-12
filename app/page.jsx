"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Table = dynamic(() => import("./components/Table"), {
  ssr: false, // Ensure it’s only rendered on the client side
  loading: () => (
    <div>
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-red-800 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
});
export default function Home({ setPlayerData }) {
  const clientId = "98118053adac418aae2845408ea6c68c";
  const clientSecret = "c575ef26e43f451e8790fb491b88d17b";
  const [getMusic, setGetMusic] = useState([]);

  const getToken = async () => {
    const tokenUrl = "https://accounts.spotify.com/api/token";

    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        },
      }
    );

    return response.data.access_token;
  };

  const searchTrack = async (query, accessToken) => {
    const searchUrl = `https://api.spotify.com/v1/search?q=${query}&type=track`;

    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  const getTracks = async (accessToken) => {
    const searchUrl = `https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks`;

    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const topTracks = response.data.items
      .filter((item) => item.track.preview_url)
      .map((item) => item.track);

    return topTracks;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getToken();
        const Tracks = await getTracks(accessToken);
        setGetMusic(Tracks);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="w-full ml-2    mt-[5rem]  ">
      <div
        className="flex relative   rounded-[30px] h-64 p-3 lg:w-[45rem] md:w-[34rem]   "
        style={{ background: `url('/Background.png')` }}
      >
        <div className="flex flex-col justify-center ">
          <div>
            <div className="flex w-20 items-center">
              <Image
                src="/Verified.png"
                // layout="responsive"
                width={30}
                height={20}
                alt="Verified"
              />
              <span className="ml-2  text-xs lg:text-lg md:text-md">
                Verified Artist
              </span>
            </div>
            <h2 className="lg:text-3xl md:text-xl text-sm font-semibold">
              Michael Jackson
            </h2>
            <small className="text-xs">27.852.501 monthly listeners</small>
          </div>
        </div>
        <div className="lg:absolute md:absolute sm:absolute relative  end-0 bottom-0  ">
          <Image
            src="/Michael.png"
            alt="Michael"
            width={350}
            height={350}
            className="rounded-md"
          />
        </div>
      </div>
      <div className="mt-5 p-3 ">
        <Table data={getMusic} setPlayerData={setPlayerData} />
      </div>
    </div>
  );
}
