import PodcastCard from "@/components/Cards/PodcastCard";
import Player from "@/components/Player";
import PlayerBottom from "@/components/PlayerBottom";
import { useState } from "react";
import { useSelector } from "react-redux";
import AllPodcastSection from "./AllPodcastSection";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Homepage = ({ AllPodcasts }) => {
  const podcast = useSelector((state) => state.PodcastSlice);
  const podcasts = useSelector((state) => state.PodcastListSlice);

  return (
    <div className="">
      <AllPodcastSection AllPodcasts={AllPodcasts} />
      
      {podcast && <PlayerBottom />}
    </div>
  );
};

export default Homepage;
