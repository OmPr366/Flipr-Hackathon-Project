import { MusicalNoteIcon, PlayIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";


const PodcastCard = () => {
  return (
    <div className="bg-black shadow-lg rounded-lg overflow-hidden p-4 w-40 cursor-pointer podcastCard ">
        <div className="bg-white w-6 h-6 rounded-full absolute justify-center items-center flex  mt-1 shadow-lg playIcon" >
        {/* <MusicalNoteIcon color="black" width={20} /> */}
        <VideoCameraIcon color="black" width={20} />
      </div>
      <div className="relative pb-32  rounded-md overflow-hidden  ">
      
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="https://picsum.photos/id/1040/600/600"
          alt="Spotify Album Art"
          width={600}
          height={600}
        />
      </div>
      {/* Play button icon */}
      <button className=" bg-green-600 w-10 h-10 rounded-full flex justify-center items-center absolute postCastPlayBtn ">
        <PlayIcon color="white" width={30} />
        </button>
        


      {/* Icon */}
      
      <div>
        <div className="text-md font-bold mb-1 mt-2 text-white">RapCavier</div>
        <div className=" mb-2 text-white text-xs  ">
          The Weekend is on top of the biggest lorem...
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
