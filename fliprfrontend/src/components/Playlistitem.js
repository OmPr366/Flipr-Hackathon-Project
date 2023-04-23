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
import { useRouter } from "next/navigation";
import { incrementPodcastViews } from "@/actions/podcast";

const Playlistitem = ({ podcast, isAdmin }) => {
    const dispatch = useDispatch();
    const { push } = useRouter();
    // console.log(props.podcast);

    const openPodcast = () => {
        dispatch(
            setPodcast({
                ...podcast,
                currentTime: 0,
                isplaying: true,
            })
        );
        localStorage.setItem(
            "currentpodcast",
            JSON.stringify({
                ...podcast,
                currentTime: 0,
                isplaying: true,
            })
        );
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            incrementPodcastViews({
                podcastId: podcast?._id,
                userId: user?._id
            })
        }
    };

    const redirectPodcast = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            incrementPodcastViews({
                podcastId: podcast?._id,
                userId: user?._id
            })
        }
        push(`/podcast/${podcast?._id}`);
    };

    return (
        <div className="flex items-center justify-between shadow-lg rounded-lg overflow-hidden p-4 w-full h-10  cursor-pointer podcastCard bg-primary-800  ">
            <div className="bg-white w-6 h-6 rounded-full justify-center items-center flex  mt-1 shadow-lg playIcon">
                {podcast?.type === "audio" ? (
                    <MusicalNoteIcon color="black" width={20} />
                ) : (
                    <VideoCameraIcon color="black" width={20} />
                )}
                {/* <MusicalNoteIcon color="black" width={20} /> */}
                {/* <VideoCameraIcon color="black" width={20} /> */}
            </div>
            <div className="relative flex items-center">
                <Image
                    className="object-cover ImageBox rounded-full h-10 w-10"
                    src={podcast?.image}
                    alt={podcast?.title}
                    width={40}
                    height={40}
                />
            </div>
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
            <button className="bg-green-600 w-10 h-10 rounded-full flex justify-center items-center">
                <PlayIcon
                    color="white"
                    width={30}
                    onClick={podcast?.type === "audio" ? openPodcast : redirectPodcast}
                />
            </button>
        </div>
    );
};

export default Playlistitem;
