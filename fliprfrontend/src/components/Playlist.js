import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AllPodcastSection from "./Homepage/AllPodcastSection";
import { useRouter } from "next/router";
import Playlistrow from "./Plalylistrow";
import PlayerBottom from "./PlayerBottom";

const Playlist = ({ data }) => {
  const router = useRouter();
  const podcast = useSelector((state) => state.PodcastSlice);

  //   const getPodcasts = async () => {
  //     const data = await axios.get(
  //       `https://fipr-backend.onrender.com/search-podcast/${title}`
  //     );
  //     console.log(data);
  //     if (data) {
  //       // console.log(data.data.podcasts);
  //       setAllPodcasts(data.data.podcasts);
  //     }
  //   };

  //   useEffect(() => {
  //     getPodcasts();
  //   }, [title]);

  return (
    <div>
      <div className="text-2xl mt-5 mb-2 text-white">{data?.title}</div>
      <div className="text-gray-500">{data?.authorName}</div>
      <Playlistrow AllPodcasts={data?.podcasts} playlistId={data?._id} />
      {podcast && <PlayerBottom />}
    </div>
  );
};

export default Playlist;
