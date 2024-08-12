"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const Table = ({ data, setPlayerData }) => {
  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Ensures seconds are always two digits
  };
  const [songs, Setsongs] = useState(data);
  console.log(songs);
  const [showAll, setShowAll] = useState(false);
  const visibleSongs = showAll ? songs : songs.slice(0, 5);

  useEffect(() => {
    Setsongs(data); // Update songs when data changes
  }, [data]); // Depend on data to update songs

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedSongs = Array.from(songs);
    const [movedSong] = reorderedSongs.splice(result.source.index, 1);
    reorderedSongs.splice(result.destination.index, 0, movedSong);
    Setsongs(reorderedSongs);
  };
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleRowClick = (id, music) => {
    setSelectedRowId(id); // Set the selected row ID
    setPlayerData(music); // Set player data
  };
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between ">
        <div>
          <p>Popular</p>
        </div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "See All"}
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <table
              className="table mt-5"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>TITLE</th>
                  <th>PLAYING</th>
                  <th>TIME</th>
                  <th align="end">ALBUM</th>
                </tr>
              </thead>
              <tbody>
                {visibleSongs.map((music, id) => (
                  <Draggable
                    key={id.toString()}
                    draggableId={id.toString()}
                    index={id}
                  >
                    {(provided) => (
                      <tr
                        className={`cursor-pointer ${
                          selectedRowId === id
                            ? "bg-red-800 text-white"
                            : "hover:bg-red-600"
                        }`}
                        onClick={() => handleRowClick(id, music)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <th>{id + 1}</th>
                        <td>
                          <div className="flex items-center">
                            <Image
                              className="mask mask-square"
                              src={
                                music.album.images[0]?.url ||
                                "/default-image.png"
                              }
                              alt="music"
                              height={30}
                              width={30}
                            />
                            <span className="ml-3">{music?.name}</span>
                          </div>
                        </td>
                        <td>{music?.name}</td>
                        <td>{formatDuration(music.duration_ms)}</td>
                        <td align="end">{music?.album.artists[0]?.name}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Table;
