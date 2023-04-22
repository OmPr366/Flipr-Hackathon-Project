import Layout from "@/components/Layout";
import React, { useEffect, useRef, useState } from "react";
import {
    HeartIcon,
    PlayCircleIcon,
    PauseCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from 'react-redux';

const listen = () => {
    const podcast = {
        _id: '6443cf129dc7f44c5592974f',
        title: 'My video',
        description: 'Join us every week as we explore the world of mindfulness and meditation, and learn practical techniques to bring more peace and clarity into your daily life.',
        image: 'https://res.cloudinary.com/ompra/image/upload/v1682165502/zhnc5dnzk0q6rmqce575.jpg',
        category: 'News',
        type: 'video',
        fileUrl: 'https://res.cloudinary.com/ompra/video/upload/v1682165513/bnikb2npi0nzlu0jgnzc.mp4',
        authorName: 'Ashish Mohite',
        userId: '6443cc279dc7f44c55929744',
        createdAt: '2023-04-22T12:12:02.500Z',
        updatedAt: '2023-04-22T12:12:02.500Z',
        __v: 0
    }
    const audio = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        audio.current.addEventListener('timeupdate', handleTimeUpdate);
        audio.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }, [audio.current]);
    useEffect(() => {
        if (audio.current) {
            audio.current.play();
            setIsPlaying(true)
            audio.current.currentTime = 0;
            setCurrentTime(0);
        }
    }, []);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                event.preventDefault();
                if (audio.current.paused) {
                    setIsPlaying(true)
                    audio.current.play();
                } else {
                    setIsPlaying(false)
                    audio.current.pause();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    function handleTimeUpdate() {
        if (audio.current)
            setCurrentTime(audio.current.currentTime);
    }
    function handleLoadedMetadata() {
        if (audio.current)
            setDuration(audio.current.duration);
    }
    function handlePlayPause() {
        if (isPlaying) {
            audio.current.pause();
        } else {
            audio.current.play();
        }
        setIsPlaying(!isPlaying);
    }
    function handleSeek(e) {
        const { value } = e.target;
        audio.current.currentTime = value;
        setCurrentTime(value);
    }
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        podcast &&
        <Layout>
            <div>
                <div className={`flex justify-center my-2 ${isPlaying ? ' ' : 'opacity-20'}`}>
                    <video ref={audio} src={podcast.fileUrl} className="w-3/4" />
                </div>
                <div className="relative">
                    <div className="my-2 flex justify-center items-center bottom-10">
                        <span>{formatTime(currentTime)}</span>
                        <input className="w-full mx-2 bg-gray-300 rounded-full overflow-hidden" type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} />
                        <span>{formatTime(duration)}</span>
                    </div>
                    <div className="flex justify-center my-2">
                        <div className="cursor-pointer mx-2" onClick={handlePlayPause}>
                            {
                                isPlaying ?
                                    React.createElement(PauseCircleIcon, {
                                        className: `h-10 w-10 text-white  rounded-full p-2 `,
                                        strokeWidth: 1,
                                    }) :
                                    React.createElement(PlayCircleIcon, {
                                        className: `h-10 w-10 text-white `,
                                        strokeWidth: 1,
                                    })
                            }
                        </div>
                        <HeartIcon className="h-10 w-10" strokeWidth="1" />
                    </div>
                </div>
                <div className="flex justify-center absolute top-20">
                    {
                        !isPlaying &&
                        <div className="flex justify-between p-2 px-4">
                            <div>
                                <h2 className='text-2xl'>{podcast.title}</h2>
                                <p className="mt-2 text-gray-600">{podcast.authorName}</p>
                                <p className="mt-4">{podcast.description}.</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Layout>
    );
};

export default listen;
