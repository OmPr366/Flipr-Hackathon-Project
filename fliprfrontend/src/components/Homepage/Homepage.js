import PodcastCard from "@/components/Cards/PodcastCard";
import Player from "@/components/Player";
import PlayerBottom from "@/components/PlayerBottom";
import { useState } from "react";
import { useSelector } from "react-redux";
import AllPodcastSection from "./AllPodcastSection";
import CategorySection from "./CategorySection";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Homepage = ({ AllPodcasts }) => {
  const podcast = useSelector((state) => state.PodcastSlice);
  const AllFavPodcasts = useSelector((state) => state.FavPodcastSlice);


  return (
    <div className="">
      <AllPodcastSection AllPodcasts={AllPodcasts} />
      {AllFavPodcasts.length > 0 ? <AllPodcastSection AllPodcasts={AllFavPodcasts} title="Favourites" />:null}
      
      <CategorySection />
      
      {podcast && <PlayerBottom />}
    </div>
  );
};

export default Homepage;
