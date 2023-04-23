import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AllPodcastSection from "./Homepage/AllPodcastSection";
import { useRouter } from "next/router";
import Playlistrow from "./Plalylistrow";

const Search = () => {
    const router = useRouter()
    const { query: { id } } = router

    const [AllPodcasts, setAllPodcasts] = useState([
        {
            "_id": "64450d92339bb8eb31a8f102",
            "title": "Shinunoga e wa",
            "description": "This podcast will provide the guidance and support you need to navigate your own journey",
            "image": "https://res.cloudinary.com/ompra/image/upload/v1682247041/kjvgfvmx3gx9ga5bj5la.jpg",
            "category": "Comedy",
            "type": "audio",
            "fileUrl": "https://res.cloudinary.com/ompra/video/upload/v1682247054/l5wozqpvliptpgnt8l4b.mp3",
            "authorName": "Ashish Mohite",
            "userId": "6443cc279dc7f44c55929744",
            "userViews": [
                "6443cc279dc7f44c55929744",
                "644301bcd95c6375f8274f73"
            ],
            "createdAt": "2023-04-23T10:50:58.037Z",
            "updatedAt": "2023-04-23T12:20:57.705Z",
            "__v": 0
        },
        {
            "_id": "64450c01339bb8eb31a8f0dc",
            "title": "Echoes in the Mind",
            "description": "Join us as we explore the depths of the human psyche, delving into topics that linger in the mind long after the episode ends.",
            "image": "https://res.cloudinary.com/ompra/raw/upload/v1682246338/h1yijcepfuvgkeokwelc",
            "category": "Education",
            "type": "video",
            "fileUrl": "https://res.cloudinary.com/ompra/video/upload/v1682246399/dzwp9dj8ufqsayw20x5y.mp3",
            "authorName": "Ashish Mohite",
            "userId": "6443cc279dc7f44c55929744",
            "userViews": [
                "6443cc279dc7f44c55929744",
                "644301bcd95c6375f8274f73"
            ],
            "createdAt": "2023-04-23T10:44:17.472Z",
            "updatedAt": "2023-04-23T11:47:44.708Z",
            "__v": 0
        },
        {
            "_id": "6444d54e00ccbb2f21fdab75",
            "title": "Maan Meri Jaan",
            "description": "Maan Meri Jaan is a Hindi language song and is sung by King. Maan Meri Jaan, from the album Champagne Talk, was released in the year 2022.",
            "image": "https://res.cloudinary.com/ompra/image/upload/v1682232589/r1vh74hjdqucguxrls7i.jpg",
            "category": "Comedy",
            "type": "audio",
            "fileUrl": "https://res.cloudinary.com/ompra/video/upload/v1682232649/vvbeyhhu72ans6ctwtw4.mp3",
            "authorName": "Om Prakash",
            "userId": "644301bcd95c6375f8274f73",
            "userViews": [
                "644301bcd95c6375f8274f73",
                "6444f33ce77e301eda85d8b4",
                "6444f2c9e77e301eda85d899"
            ],
            "createdAt": "2023-04-23T06:50:54.936Z",
            "updatedAt": "2023-04-23T08:59:28.336Z",
            "__v": 0
        },
        {
            "_id": "6443cf129dc7f44c5592974f",
            "title": "video",
            "description": "video",
            "image": "https://res.cloudinary.com/ompra/image/upload/v1682165502/zhnc5dnzk0q6rmqce575.jpg",
            "category": "News",
            "type": "video",
            "fileUrl": "https://res.cloudinary.com/ompra/video/upload/v1682165513/bnikb2npi0nzlu0jgnzc.mp4",
            "authorName": "Ashish Mohite",
            "userId": "6443cc279dc7f44c55929744",
            "createdAt": "2023-04-22T12:12:02.500Z",
            "updatedAt": "2023-04-23T07:14:07.221Z",
            "__v": 0,
            "userViews": [
                "6443cc279dc7f44c55929744",
                "644301bcd95c6375f8274f73"
            ]
        },
        {
            "_id": "6443ce119dc7f44c55929749",
            "title": "first",
            "description": "first",
            "image": "https://res.cloudinary.com/ompra/image/upload/v1682165246/mwlxxkadfe5ubslaocdt.jpg",
            "category": "Comedy",
            "type": "audio",
            "fileUrl": "https://res.cloudinary.com/ompra/video/upload/v1682165263/rjdm7imbagvq24jmtezc.mp3",
            "authorName": "Ashish Mohite",
            "userId": "6443cc279dc7f44c55929744",
            "createdAt": "2023-04-22T12:07:45.882Z",
            "updatedAt": "2023-04-23T08:59:11.602Z",
            "__v": 0,
            "userViews": [
                "644301bcd95c6375f8274f73",
                "6443cc279dc7f44c55929744",
                "6444f33ce77e301eda85d8b4"
            ]
        },
        {
            "_id": "6443bee30b8c4b1a427c6f31",
            "title": "Lorem ipsum",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "image": "https://res.cloudinary.com/ompra/image/upload/v1682161362/yzvxzctso3qiqt1s8ks0.png",
            "category": "News",
            "type": "audio",
            "fileUrl": "https://res.cloudinary.com/ompra/video/upload/v1682161373/olrz59hsh8fl1rcwglhq.mp4",
            "authorName": "Om Prakash",
            "userId": "644301bcd95c6375f8274f73",
            "createdAt": "2023-04-22T11:02:59.475Z",
            "updatedAt": "2023-04-22T19:14:36.597Z",
            "__v": 0,
            "userViews": [
                "644301bcd95c6375f8274f73"
            ]
        },
        {
            "_id": "6443b4f80b8c4b1a427c6e8a",
            "title": "Video Title",
            "description": "This is and Desc of Video ",
            "image": "https://res.cloudinary.com/ompra/image/upload/v1682158757/vy9dz6pqrv5y2wm8tmyv.png",
            "category": "Comedy",
            "type": "video",
            "fileUrl": "https://res.cloudinary.com/ompra/video/upload/v1682158832/qkfeczjlasojur6yibde.mp4",
            "authorName": "Om Prakash",
            "userId": "644301bcd95c6375f8274f73",
            "createdAt": "2023-04-22T10:20:40.284Z",
            "updatedAt": "2023-04-23T09:00:26.596Z",
            "__v": 0,
            "userViews": [
                "6444f33ce77e301eda85d8b4"
            ]
        },
        {
            "_id": "6443b4330b8c4b1a427c6e88",
            "title": "Om Updated",
            "description": "fnfffn",
            "image": "https://res.cloudinary.com/ompra/image/upload/v1682158450/toeqj8mt8x6ljlgd2iyx.png",
            "category": "Comedy",
            "type": "video",
            "fileUrl": "https://res.cloudinary.com/ompra/image/upload/v1682158639/dstsczv3gk6m0omwlgak.png",
            "authorName": "Om Prakash",
            "userId": "644301bcd95c6375f8274f73",
            "createdAt": "2023-04-22T10:17:23.745Z",
            "updatedAt": "2023-04-22T19:03:03.688Z",
            "__v": 0,
            "userViews": [
                "644301bcd95c6375f8274f73"
            ]
        },
        {
            "userViews": [],
            "_id": "6443afcd0b8c4b1a427c6e82",
            "title": "Image Podcast",
            "description": "Podcast with Image",
            "image": "https://res.cloudinary.com/ompra/image/upload/v1682157431/rcevqejkncvxiiqj364l.png",
            "category": "Comedy",
            "type": "image",
            "fileUrl": "null",
            "authorName": "Om Prakash",
            "userId": "644301bcd95c6375f8274f73",
            "createdAt": "2023-04-22T09:58:37.767Z",
            "updatedAt": "2023-04-22T09:58:37.767Z",
            "__v": 0
        },
        {
            "userViews": [],
            "_id": "6443a64d0b8c4b1a427c6e80",
            "title": "Podcast  New",
            "description": "This is desc",
            "image": "",
            "category": "Comedy",
            "type": "image",
            "fileUrl": "null",
            "authorName": "",
            "createdAt": "2023-04-22T09:18:05.929Z",
            "updatedAt": "2023-04-22T09:18:05.929Z",
            "__v": 0
        },
        {
            "userViews": [],
            "_id": "6443a14b7ea9790731c8a170",
            "title": "Podcast By OP ",
            "description": "This is Desc",
            "image": "",
            "category": "Education",
            "type": "image",
            "fileUrl": "null",
            "authorName": "",
            "createdAt": "2023-04-22T08:56:43.693Z",
            "updatedAt": "2023-04-22T08:56:43.693Z",
            "__v": 0
        },
        {
            "userViews": [],
            "_id": "64439e2eab0be9fe8adc3547",
            "title": "Podcast By OP ",
            "description": "This is Desc",
            "image": "",
            "category": "Education",
            "type": "image",
            "fileUrl": "null",
            "authorName": "",
            "createdAt": "2023-04-22T08:43:26.240Z",
            "updatedAt": "2023-04-22T08:43:26.240Z",
            "__v": 0
        },
        {
            "userViews": [],
            "_id": "64439d8c2cbcac6d569810c0",
            "title": "Podcast By OP 2.0",
            "description": "This is Desc",
            "image": "",
            "category": "Comedy",
            "type": "image",
            "fileUrl": "null",
            "authorName": "",
            "createdAt": "2023-04-22T08:40:44.861Z",
            "updatedAt": "2023-04-22T08:40:44.861Z",
            "__v": 0
        }
    ]);

    //   const getPodcasts = async () => {
    //     const data = await axios.get(
    //       `https://fipr-backend.onrender.com/search-podcast/${title}`
    //     );
    //     console.log(data);
    //     if (data) {
    //       // console.log(data.data.podcasts);
    //       setAllPodcasts(data.data.podcasts);
    //     }
    //   };

    //   useEffect(() => {
    //     getPodcasts();
    //   }, [title]);

    return (
        <div>
            <div className="text-2xl mt-5 mb-2">Playlist Name</div>
            <div className="text-gray-500">Playlist Creator name</div>
            <Playlistrow AllPodcasts={AllPodcasts} />
        </div>
    );
};

export default Search;
