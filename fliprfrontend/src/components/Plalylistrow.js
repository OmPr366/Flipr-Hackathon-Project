import React from "react";
import PodcastCard from "./Cards/PodcastCard";
import Slider from "react-slick";
import Playlistitem from "./Playlistitem";
import index from "@/pages/dashboard/createpodcast";

const Playlistrow = ({ AllPodcasts, title }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        width: "100%",
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <>
            <div className="pb-10   " style={{ width: "100%" }}>
                <div className="mt-5">

                    {AllPodcasts?.map((podcast,index) => (
                        <div key={podcast._id}>
                            <div className="mb-2 mr-5 flex justify-center items-center ">
                                <Playlistitem podcast={podcast} index={index} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Playlistrow;
