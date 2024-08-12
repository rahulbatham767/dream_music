"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiShuffle } from "react-icons/fi";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { FaPause, FaPlay } from "react-icons/fa";
import { PiShuffleAngularBold } from "react-icons/pi";

const Player = ({ data }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [data]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => console.error("Playback error:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = () => {
    const audio = audioRef.current;
    audio.currentTime += 10;
  };

  const handleSkipBackward = () => {
    const audio = audioRef.current;
    audio.currentTime -= 10;
  };

  const handleShuffle = () => {
    // Shuffle logic
  };

  const handleRepeat = () => {
    const audio = audioRef.current;
    audio.loop = !audio.loop;
  };

  const handleSeekBarChange = (event) => {
    const audio = audioRef.current;
    audio.currentTime = event.target.value;
    setCurrentTime(audio.currentTime);
  };

  return (
    <div className="card bg-red-600 w-72 shadow-md rounded-md p-4">
      <div className="audio-player flex flex-col items-center">
        <div className="flex flex-col items-center">
          <p>Now Playing</p>
          <img
            src={data?.album?.images[0]?.url}
            width={150}
            alt="Album Cover"
          />
          <p>{data?.name}</p>
          <small>{data?.album?.artists[0]?.name}</small>
        </div>
        <audio
          ref={audioRef}
          src={data?.preview_url}
          type="audio/mpeg"
          controls
          hidden
        />
        <div className="seek-bar-container flex items-center mt-4">
          <span className="current-time text-sm">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeekBarChange}
            className="seek-bar mx-3"
          />
          <span className="current-time text-sm">{formatTime(duration)}</span>
        </div>
        <div className="audio-play flex gap-4 mt-4">
          <span>
            <FiShuffle className="cursor-pointer" onClick={handleShuffle} />
          </span>
          <span>
            <AiFillStepBackward
              className="cursor-pointer"
              onClick={handleSkipBackward}
            />
          </span>
          <span>
            {isPlaying ? (
              <FaPause className="cursor-pointer" onClick={togglePlayPause} />
            ) : (
              <FaPlay className="cursor-pointer" onClick={togglePlayPause} />
            )}
          </span>
          <span>
            <AiFillStepForward
              className="cursor-pointer"
              onClick={handleSkipForward}
            />
          </span>
          <span>
            <PiShuffleAngularBold
              className="cursor-pointer"
              onClick={handleRepeat}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Player;
