import { createPodcastInDatabase } from "@/actions/podcast";
import React, { useState } from "react";

const CreatePodcastPage = () => {

    const [podcastInputData, setPodcastInputData] = useState({
        title: "",
        description: "",
        image: "",
        category: "",
        type: "image",
        fileUrl: "",
        authorName: "",

    });


    const inputChangeHandler =  (e) => {
        
        setPodcastInputData({
            ...podcastInputData,
            [e.target.name]: e.target.value,
        });

    };



  const createPodcastHandler = (e) => {
    e.preventDefault();
    console.log(podcastInputData);
    createPodcastInDatabase(podcastInputData).then((res) => {
      console.log(res);
    });
  };

  const uploadImageHandler = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:3001/api/upload/upload-image", {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPodcastInputData({
          ...podcastInputData,
          image: data.url,
        });
      }).catch((err)=>{
        console.log(err);
      }
      );

  };


  return (
    <div className="container mx-auto my-4">
      <h1 className="text-3xl font-bold mb-4">Create a Podcast</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={createPodcastHandler}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            placeholder="Enter podcast title"
            required
            value={podcastInputData.title}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            placeholder="Enter podcast description"
            required
            value={podcastInputData.description}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image Upload
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            name="image"
            type="file"
            placeholder="Upload podcast image"
            required
            onChange={uploadImageHandler}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            name="category"
            required
            value={podcastInputData.category}
            onChange={inputChangeHandler}

          >
            <option value="">Select category</option>
            <option value="Comedy">Comedy</option>
            <option value="News">News</option>
            <option value="Education">Education</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <div className="flex items-center mb-2">
            <input
              className="mr-2 leading-tight"
              type="radio"
              name="type"
              value="image"
              checked={podcastInputData.type === "image"}
                onChange={inputChangeHandler}

            />
            <span className="text-sm">Image</span>
          </div>
          <div className="flex items-center">
            <input
              className="mr-2 leading-tight"
              type="radio"
              name="type"
              value="video"
                checked={podcastInputData.type === "video"}
                onChange={inputChangeHandler}
            />
            <span className="text-sm">Video</span>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file"
          >
            File Upload
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading            -tight focus:outline-none focus:shadow-outline"
            id="file"
            name="file"
            type="file"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={createPodcastHandler}
          >
            Create Podcast
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePodcastPage;
