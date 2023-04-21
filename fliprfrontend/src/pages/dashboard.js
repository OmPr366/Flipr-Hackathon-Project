import PodcastCard from "@/components/Cards/PodcastCard";
import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [podcasts, setPodcasts] = useState([
    { id: 1, name: "Podcast 1", description: "This is the first podcast" },
    { id: 2, name: "Podcast 2", description: "This is the second podcast" },
    { id: 3, name: "Podcast 3", description: "This is the third podcast" },
    { id: 31, name: "Podcast 3", description: "This is the third podcast" },
    { id: 32, name: "Podcast 3", description: "This is the third podcast" },
    { id: 33, name: "Podcast 3", description: "This is the third podcast" },
    { id: 34, name: "Podcast 3", description: "This is the third podcast" },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPodcasts([...podcasts, { id: podcasts.length + 1, ...formData }]);
    setShowModal(false);
    setFormData({ name: "", description: "" });
  };

  return (
    <div
      className=" bg-blue-gray-600 justify-center content-center flex pb-10 "
      
    >
      <div style={{
        maxWidth: "1000px",
        width: "100%",
      }}>
        {/* Title */}
        <div className="text-3xl font-bold text-white  text-center pt-5 ">
          User Dashboard
        </div>

        {/* User Details -  Name , Email  , Image  */}
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-full w-32 h-32 mt-5">
            <img
              src="https://picsum.photos/id/1040/600/600"
              alt="User Image"
              className="rounded-full w-32 h-32"
            />
          </div>
          <div className="text-xl font-bold text-white mt-2">
            User Name - Om Prakash
          </div>
          <div className="text-lg font-bold text-white mt-2">
            User Email - om@gmail.com
          </div>
        </div>

        {/* A single line  */}
        <div className="border-b-2 border-white mt-12 "></div>

        {/* All podcasts*/}
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
    </div>
  );
};

export default UserDashboard;
