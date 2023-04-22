import {
  MusicalNoteIcon,
  PlayIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { setPodcast } from "@/utils/Redux/PodcastSlice";

const PodcastCard = ({ podcast ,isAdmin }) => {
  const dispatch = useDispatch()
  // console.log(props.podcast);

  const openPodcast = () => {
    dispatch(setPodcast(podcast))
  }

  return (
   
      <div className="bg-black shadow-lg rounded-lg overflow-hidden p-4 w-40 h-60  cursor-pointer border  podcastCard  ">
        <div className="bg-white w-6 h-6 rounded-full absolute justify-center items-center flex  mt-1 shadow-lg playIcon">
          {podcast?.type === "audio" ? (
            <MusicalNoteIcon color="black" width={20} />
          ) : (
            <VideoCameraIcon color="black" width={20} />
          )}
          {/* <MusicalNoteIcon color="black" width={20} /> */}
          {/* <VideoCameraIcon color="black" width={20} /> */}
        </div>
        <div className="relative pb-32  rounded-md overflow-hidden  ">
          <Image
            className="absolute inset-0 h-full w-full object-cover ImageBox"
            src={podcast?.image}
            alt={podcast?.title}
            width={600}
            height={600}
          />
        </div>
        {/* Play button icon */}
        <button className=" bg-green-600 w-10 h-10 rounded-full flex justify-center items-center absolute postCastPlayBtn ">
          <PlayIcon color="white" width={30} onClick={openPodcast} />
        </button>

        {/* Icon */}

        {isAdmin ? <Link href={`/dashboard/podcast/${podcast?._id}`}>
          <div>
          <div className="text-md font-bold mb-1 mt-2 text-white">
            {podcast?.title}
          </div>
          <div className=" mb-2 text-white text-xs  ">
            {podcast?.description.length > 42
              ? podcast?.description.slice(0, 42) + "..."
              : podcast?.description}
          </div>
          </div>
          </Link>:

        <div>
          <div className="text-md font-bold mb-1 mt-2 text-white">
            {podcast?.title}
          </div>
          <div className=" mb-2 text-white text-xs  ">
            {podcast?.description.length > 42
              ? podcast?.description.slice(0, 42) + "..."
              : podcast?.description}
          </div>
        </div> }
      </div>
  );
};

export default PodcastCard;
