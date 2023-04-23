import React from "react";
import PodcastCard from "../Cards/PodcastCard";
import Slider from "react-slick";
import PlaylistCard from "../Cards/PlaylistCard";

const PlaylistSection = ({ AllPlaylist, title }) => {
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
      <div className="pb-10" style={{ width: "100%" }}>
        <div className="mt-5">
          <div className="text-2xl font-bold text-white mt-5 mb-8">{title}</div>

          <Slider {...settings}>
            {AllPlaylist?.map((playlist) => (
              <div key={playlist._id}>
                <div className="mb-5 mr-5 flex justify-center items-center ">
                  <PlaylistCard playlist={playlist} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default PlaylistSection;