import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AllPodcastSection from "./Homepage/AllPodcastSection";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const {
    query: { title },
  } = router;

  const [AllPodcasts, setAllPodcasts] = useState([]);

  const getPodcasts = async () => {
    const data = await axios.get(
      `http://localhost:3001/search-podcast/${title}`
    );
    console.log(data);
    if (data) {
      // console.log(data.data.podcasts);
      setAllPodcasts(data.data.podcasts);
    }
  };

  useEffect(() => {
    getPodcasts();
  }, [title]);

  return (
    <div>
      <div className="text-2xl my-10">Showing Results for {title}</div>
      <AllPodcastSection AllPodcasts={AllPodcasts} />
    </div>
  );
};

export default Search;
