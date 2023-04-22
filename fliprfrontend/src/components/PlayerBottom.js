import React, { useEffect, useRef } from "react";
import ComplexNavbar from "@/components/Navbar";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import {
  HeartIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPodcast } from "@/utils/Redux/PodcastSlice";
import Image from "next/image";
import { RemoveFavoritePodcast, addToFavoritePodcast } from "@/actions/podcast";
import { setFavPodcasts } from "@/utils/Redux/FavPodcastSlice";

export default function PlayerBottom() {
  const podcast = useSelector((state) => state.PodcastSlice);
  const FavPodcasts = useSelector((state) => state.FavPodcastSlice);
  const audio = useRef(null);
  const [audioisPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    audio.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    console.log("useEffect ", podcast);
  }, [audio.current]);
  useEffect(() => {
    if (audio.current) {
      audio.current.play();
      audio.current.currentTime = podcast?.currentTime;
    }
    setIsPlaying(podcast.isplaying)
  }, []);
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.code === "Space") {
  //       event.preventDefault();
  //       if (audio.current.paused) {
  //         setIsPlaying(true)
  //         dispatch(
  //           setPodcast({
  //             ...podcast,
  //             isplaying: true,
  //           })
  //         );
  //         audio.current.play();
  //       } else {
  //         setIsPlaying(false)
  //         dispatch(
  //           setPodcast({
  //             ...podcast,
  //             isplaying: false,
  //           })
  //         );
  //         audio.current.pause();
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);
  function handleTimeUpdate() {
    if (audio.current) {
      dispatch(
        setPodcast({ ...podcast, currentTime: audio.current.currentTime })
      );
      localStorage.setItem(
        "currentpodcast",
        JSON.stringify({ ...podcast, currentTime: audio.current.currentTime })
      );
    }
  }
  function handleLoadedMetadata() {
    if (audio.current) setDuration(audio.current.duration);
  }
  function handlePlayPause() {
    if (podcast?.isplaying || audioisPlaying) {
      setIsPlaying(false)
      audio.current.pause();
      dispatch(
        setPodcast({
          ...podcast,
          isplaying: false,
          currentTime: audio.current.currentTime,
        })
      );
      localStorage.setItem(
        "currentpodcast",
        JSON.stringify({
          ...podcast,
          isplaying: false,
          currentTime: audio.current.currentTime,
        })
      );
    } else {
      setIsPlaying(true)
      audio.current.play();
      dispatch(
        setPodcast({
          ...podcast,
          isplaying: true,
          currentTime: audio.current.currentTime,
        })
      );
      localStorage.setItem(
        "currentpodcast",
        JSON.stringify({
          ...podcast,
          isplaying: true,
          currentTime: audio.current.currentTime,
        })
      );
    }
  }
  function handleSeek(e) {
    const { value } = e.target;
    audio.current.currentTime = value;
    dispatch(setPodcast({ ...podcast, currentTime: value }));
    localStorage.setItem(
      "currentpodcast",
      JSON.stringify({ ...podcast, currentTime: value })
    );
  }
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  const progress = duration ? (podcast?.currentTime / duration) * 100 : 0;

  const dispatch = useDispatch();

  const closePodcast = () => {
    audio.current.pause();
    dispatch(setPodcast(null));
  };

  // Check Whether Podcast is in FavPodcasts
  const isFav = FavPodcasts?.find((fav) => fav._id === podcast?._id);

  const LikeCickHandler = async () => {
    const User = JSON.parse(localStorage.getItem("user"));
    if (!isFav) {
      addToFavoritePodcast({
        podcastId: podcast._id,
        userId: User._id,
      }).then((res) => {
        if (res.status == 200) {
          console.log(res.data, "All podcasts");
          dispatch(setFavPodcasts([...FavPodcasts, podcast]));
        }
      });
    } else {
      dispatch(
        setFavPodcasts(FavPodcasts.filter((fav) => fav._id !== podcast._id))
      );
      RemoveFavoritePodcast({
        podcastId: podcast._id,
        userId: User._id,
      });
    }
  };

  return (
    <div className="fixed bottom-0 right-0 px-10 py-4 bg-gray-900 z-40 w-full  flex justify-between text-white">
      <audio ref={audio} src={podcast.fileUrl} />
      <div className="flex justify-start mr-10 max-w-1/2">
        <Image
          src={podcast.image}
          width={80}
          height={80}
          alt={podcast?.title}
        />
        <div className="flex flex-col justify-center ml-2">
          <h2 className="text-xl">{podcast.title}</h2>
          <p>{podcast.description}.</p>
        </div>
      </div>
      <div className="my-2 w-1/2 flex justify-center items-center">
        <span>{formatTime(podcast?.currentTime)}</span>
        <input
          className="w-full mx-2 bg-gray-300 rounded-full overflow-hidden"
          type="range"
          min={0}
          max={duration}
          value={podcast?.currentTime}
          onChange={handleSeek}
        />
        <span>{formatTime(duration)}</span>
        <div className="flex justify-center my-2">
          <div className="cursor-pointer mx-5" onClick={handlePlayPause}>
            {podcast?.isplaying || audioisPlaying
              ? React.createElement(PauseCircleIcon, {
                className: `h-8 w-8`,
                strokeWidth: 1,
              })
              : React.createElement(PlayCircleIcon, {
                className: `h-8 w-8`,
                strokeWidth: 1,
              })}
          </div>
          <HeartIcon
            className="h-8 w-8 cursor-pointer "
            color={isFav ? "red" : "white"}
            strokeWidth="1"
            onClick={LikeCickHandler}
          />
        </div>
      </div>
    </div>
  )
}
