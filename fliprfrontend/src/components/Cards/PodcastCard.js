import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const PodcastCard = () => {
  return (
    <div className="bg-black shadow-lg rounded-lg overflow-hidden p-4 w-40 ">
        <div className="bg-white w-5 h-5 rounded-full absolute ml-24 mt-1  " style={{
            zIndex:999
        }} >
        <MusicalNoteIcon color="red" width={22} />
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
