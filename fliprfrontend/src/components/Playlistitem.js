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

const Playlistitem = ({ podcast, isAdmin, index }) => {
    const dispatch = useDispatch();
    const { push } = useRouter();
    // console.log(props.podcast);

    const openPodcast = () => {
        console.log('open');
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
        console.log('redirect');
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
        <div className="flex items-center overflow-hidden py-4 px-0 w-full h-10 cursor-pointer">
            <div className="mr-4">{index + 1}.</div>
            <div className="relative mr-5 flex items-center">
                <Image
                    className="object-cover ImageBox rounded-full h-10 w-10"
                    src={podcast?.image}
                    alt={podcast?.title}
                    width={40}
                    height={40}
                />
            </div>
            <div className="text-xs md:text-md md:font-bold text-white w-1/6">
                {podcast?.title}
            </div>
            <div className="text-white text-xs mr-auto ml-2">
                {podcast?.description.length > 42
                    ? podcast?.description.slice(0, 42) + "..."
                    : podcast?.description}
            </div>
            <div className="flex ml-auto">
                <div className="bg-white w-6 h-6 rounded-full justify-center items-center flex">
                    {podcast?.type === "audio" ? (
                        <MusicalNoteIcon color="black" />
                    ) : (
                        <VideoCameraIcon color="black" />
                    )}
                    {/* <MusicalNoteIcon color="black" width={20} /> */}
                    {/* <VideoCameraIcon color="black" width={20} /> */}
                </div>
                <button className="bg-green-600 w-6 h-6 ml-4 rounded-full flex justify-center items-center">
                    <PlayIcon
                        color="white"
                        width={20}
                        onClick={podcast?.type === "audio" ? openPodcast : redirectPodcast}
                    />
                </button>
            </div>
        </div>
    );
};

export default Playlistitem;
