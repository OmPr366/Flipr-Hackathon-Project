import PodcastCard from "@/components/Cards/PodcastCard";
import Player from '@/components/Player'
import PlayerBottom from '@/components/PlayerBottom'
import { useState } from "react";
import { useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
    const podcasts =
        [
            { id: 1, type: 'audio', name: "Podcast 1", description: "This is the first podcast", img: 'https://picsum.photos/id/1040/600/600', url: 'https://docs.google.com/uc?export=download&id=1aE1v-3Fsl6gx6t-7BhsPHOl5jOEq7p83' },
            { id: 2, type: 'video', name: "Podcast 2", description: "This is the second podcast", img: 'https://picsum.photos/id/1040/600/600', url: 'https://docs.google.com/uc?export=download&id=1aE1v-3Fsl6gx6t-7BhsPHOl5jOEq7p83' },
            { id: 2, type: 'video', name: "Podcast 2", description: "This is the second podcast", img: 'https://picsum.photos/id/1040/600/600', url: 'https://docs.google.com/uc?export=download&id=1aE1v-3Fsl6gx6t-7BhsPHOl5jOEq7p83' },
            { id: 2, type: 'video', name: "Podcast 2", description: "This is the second podcast", img: 'https://picsum.photos/id/1040/600/600', url: 'https://docs.google.com/uc?export=download&id=1aE1v-3Fsl6gx6t-7BhsPHOl5jOEq7p83' },
            { id: 2, type: 'video', name: "Podcast 2", description: "This is the second podcast", img: 'https://picsum.photos/id/1040/600/600', url: 'https://docs.google.com/uc?export=download&id=1aE1v-3Fsl6gx6t-7BhsPHOl5jOEq7p83' },
            { id: 2, type: 'video', name: "Podcast 2", description: "This is the second podcast", img: 'https://picsum.photos/id/1040/600/600', url: 'https://docs.google.com/uc?export=download&id=1aE1v-3Fsl6gx6t-7BhsPHOl5jOEq7p83' },
            { id: 2, type: 'video', name: "Podcast 2", description: "This is the second podcast", img: 'https://picsum.photos/id/1040/600/600', url: 'https://docs.google.com/uc?export=download&id=1aE1v-3Fsl6gx6t-7BhsPHOl5jOEq7p83' },
            { id: 2, type: 'video', name: "Podcast 2", description: "This is the second podcast", img: 'https://picsum.photos/id/1040/600/600', url: 'https://docs.google.com/uc?export=download&id=1aE1v-3Fsl6gx6t-7BhsPHOl5jOEq7p83' },
        ]

    const podcast = useSelector((state) => state.PodcastSlice)

    return (
        <div className="flex justify-start" >
            <div className="pb-10 px-10" style={{ width: "100%" }}>
                <div className="flex flex-col ">
                    <div className="text-2xl font-bold text-white mt-5">All Podcasts</div>
                    <div className="flex flex-row flex-wrap justify- mt-5  ">
                        {podcasts.map((podcast) => (
                            <div key={podcast.id} className="mb-5 mr-5">
                                <PodcastCard podcast={podcast} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            {
                podcast &&
                <PlayerBottom />
            }
        </div>
    );
};

export default Homepage;
