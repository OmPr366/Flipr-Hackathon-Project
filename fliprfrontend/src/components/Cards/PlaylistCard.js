import {
  MusicalNoteIcon,
  PlayIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { setplaylist } from "@/utils/Redux/PlaylistSlice";
import { useRouter } from "next/navigation";
// import { incrementplaylistViews } from "@/actions/playlist";

const PlaylistCard = ({ playlist, isAdmin }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  // console.log(props.playlist);

  // const openplaylist = () => {
  //   dispatch(
  //     setplaylist({
  //       ...playlist,
  //       currentTime: 0,
  //       isplaying: true,
  //     })
  //   );
  //   localStorage.setItem(
  //     "currentplaylist",
  //     JSON.stringify({
  //       ...playlist,
  //       currentTime: 0,
  //       isplaying: true,
  //     })
  //   );
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //   incrementplaylistViews({
  //     playlistId: playlist?._id,
  //     userId : user?._id
  //   })
  //   }
  // };

  // const redirectplaylist = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //   incrementplaylistViews({
  //     playlistId: playlist?._id,
  //     userId : user?._id
  //   })
  //   }
  //   push(`/playlist/${playlist?._id}`);
  // };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden p-4 w-40 h-60  cursor-pointer border  playlistCard bg-primary-800  ">
      <div className="relative pb-32  rounded-md overflow-hidden  ">
        <Image
          className="absolute inset-0 h-full w-full object-cover ImageBox rounded-full"
          src={playlist?.image}
          alt={playlist?.title}
          width={600}
          height={600}
        />
      </div>
      {/* Play button icon */}
      {/* <button className=" bg-green-600 w-10 h-10 rounded-full flex justify-center items-center absolute postCastPlayBtn ">
        <PlayIcon
          color="white"
          width={30}
          onClick={playlist?.type === "audio" ? openplaylist : redirectplaylist}
        />
      </button> */}

      {/* Icon */}

      <Link href={`/playlist/123`}>
        <div>
          <div className="text-md font-bold mb-1 mt-2 text-white">
            {playlist?.title}
          </div>
          <div className=" mb-2 text-white text-xs  ">
            {playlist?.description?.length > 42
              ? playlist?.description.slice(0, 42) + "..."
              : playlist?.description}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistCard;
