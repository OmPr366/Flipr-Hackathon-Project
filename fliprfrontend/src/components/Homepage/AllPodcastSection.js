import React from "react";
import PodcastCard from "../Cards/PodcastCard";
import Slider from "react-slick";

const AllPodcastSection = ({ AllPodcasts, title }) => {
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
        {/* <div className="flex flex-col ">
          <div className="flex flex-row flex-wrap justify- mt-5  ">
            {AllPodcasts.map((podcast) => (
              <div key={podcast._id} className="mb-5 mr-5">
                <PodcastCard podcast={podcast} />
              </div>
            ))}
          </div>
        </div> */}
        <div className="mt-5">
          <div className="text-2xl font-bold text-white mt-5 mb-8">
          {title}
          </div>

          <Slider {...settings}    >
            {AllPodcasts?.map((podcast) => (
              
              <div key={podcast._id}>
                <div className="mb-5 mr-5 flex justify-center items-center ">
                  <PodcastCard podcast={podcast} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default AllPodcastSection;
