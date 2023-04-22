import { getPodcastByUser } from "@/actions/podcast";
import PodcastCard from "@/components/Cards/PodcastCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const podcasts = [
    { id: 1, name: "Podcast 1", description: "This is the first podcast" },
    { id: 2, name: "Podcast 2", description: "This is the second podcast" },
    { id: 3, name: "Podcast 3", description: "This is the third podcast" },
    { id: 31, name: "Podcast 3", description: "This is the third podcast" },
    { id: 32, name: "Podcast 3", description: "This is the third podcast" },
    { id: 33, name: "Podcast 3", description: "This is the third podcast" },
    { id: 34, name: "Podcast 3", description: "This is the third podcast" },
  ];
  const [AllPodcasts, setAllPodcasts] = useState([]);

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      getPodcastByUser(user._id).then((res) => {
        // setAllPodcasts(res.data);
        if (res.status === 200) {
          setAllPodcasts(res.data.podcasts);
        }else 
        {
          toast.error(res.data.message);

        }
        console.log(res.data?.podcasts);
      });
    }
  }, []);

  return (
    <div className=" bg-blue-gray-600 justify-center content-center flex pb-10 ">
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
        }}
      >
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
          <div className="text-2xl flex justify-between font-bold text-white mt-5">
            <p>All Podcasts</p>
            {/* Create Podcast */}
            <Link href="/dashboard/createpodcast">
              <div className="border flex justify-center items-center pl-2 pr-2 pt-1 pb-1 cursor-pointer rounded-md ">
                <p className="text-sm">Create + </p>
              </div>
            </Link>
          </div>
          <div className="flex flex-row flex-wrap justify- mt-5  ">
            {AllPodcasts.map((podcast) => (
              <div key={podcast._id} className="mb-5 mr-5">
                <PodcastCard podcast={podcast} />
              </div>
            ))}
          </div>

          {/* Add a new podcast  */}
          <div className="flex justify-center items-center mt-5">
            <Link href="/dashboard/createpodcast">
              <div className=" flex justify-center items-center pl-2 pr-2 pt-1 pb-1 cursor-pointer rounded-md bg-green-600 ">
                <p className="text-lg text-white">Create Podcast</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
