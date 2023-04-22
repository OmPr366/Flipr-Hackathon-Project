import React, { useEffect } from "react";
import ComplexNavbar from '@/components/Navbar'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import {
    HeartIcon,
    PlayCircleIcon,
    PauseCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from 'axios'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcast } from "@/utils/Redux/PodcastSlice";

export default function PlayerBottom() {
    const podcast = useSelector((state) => state.PodcastSlice)
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    // useEffect(() => {
    //     audio.addEventListener('timeupdate', handleTimeUpdate);
    //     audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    //     return () => {
    //         audio.removeEventListener('timeupdate', handleTimeUpdate);
    //         audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    //     };
    // }, [audio]);
    useEffect(() => {
        audio.play();
        setIsPlaying(true)
        audio.currentTime = 0;
        setCurrentTime(0);
    }, [podcast]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                event.preventDefault();
                if (audio.paused) {
                    setIsPlaying(true)
                    audio.play();
                } else {
                    setIsPlaying(false)
                    audio.pause();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    function handleTimeUpdate() {
        setCurrentTime(videoRef.current.currentTime);
    }
    function handleLoadedMetadata() {
        setDuration(videoRef.current.duration);
    }
    function handlePlayPause() {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
    function handleSeek(e) {
        const { value } = e.target;
        audio.currentTime = value;
        setCurrentTime(value);
    }
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    const progress = duration ? (currentTime / duration) * 100 : 0;

    const dispatch = useDispatch()

    const closePodcast = () => {
        audio.pause()
        dispatch(setPodcast(null))
    }
    return (
        podcast.type == 'audio' ?
            <div className='fixed bottom-0 px-10 py-4 bg-gray-900 z-40 w-full flex justify-between'>
                <audio ref={audio} src={podcast.url} />
                <div className='flex justify-start mr-10 max-w-1/2'>
                    <img style={{ width: '80px', height: '80px' }} className='rounded mr-10' src={podcast.img} />
                    <div className="flex flex-col justify-center">
                        <h2 className='text-xl'>{podcast.name}</h2>
                        <p>{podcast.description}.</p>
                    </div>
                </div>
                <div className="my-2 w-1/2 flex justify-center items-center">
                    <span>{formatTime(currentTime)}</span>
                    <input className="w-full mx-2 bg-gray-300 rounded-full overflow-hidden" type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} />
                    <span>{formatTime(duration)}</span>
                    <div className="flex justify-center my-2">
                        <div className="cursor-pointer mx-5" onClick={handlePlayPause}>
                            {
                                isPlaying ?
                                    React.createElement(PauseCircleIcon, {
                                        className: `h-8 w-8`,
                                        strokeWidth: 1,
                                    }) :
                                    React.createElement(PlayCircleIcon, {
                                        className: `h-8 w-8`,
                                        strokeWidth: 1,
                                    })
                            }
                        </div>
                        <HeartIcon className='h-8 w-8 cursor-pointer' strokeWidth='1' />
                    </div>
                </div>
            </div> :
            <div className='fixed p-8 bg-gray-900 z-40 inset-x-0 mx-auto rounded flex flex-col justify-between' style={{ width: '600px' }}>
                <XMarkIcon className='h-10 w-10 cursor-pointer absolute right-2 top-2' strokeWidth='1' onClick={closePodcast} />
                <div>
                    <div className='flex justify-center'>
                        <video ref={audio} src={podcast.url} />
                        {/* <img style={{ width: '300px', height: '300px' }} className='rounded' src={podcast.img} /> */}
                    </div>
                    <div className="my-2 flex justify-center items-center">
                        <span>{formatTime(currentTime)}</span>
                        <input className="w-1/2 mx-2 bg-gray-300 rounded-full overflow-hidden" type="range" min={0} max={duration} value={currentTime} onChange={handleSeek} />
                        <span>{formatTime(duration)}</span>
                    </div>
                    <div className="flex justify-center my-2">
                        <div className="cursor-pointer mx-2" onClick={handlePlayPause}>
                            {
                                isPlaying ?
                                    React.createElement(PauseCircleIcon, {
                                        className: `h-10 w-10`,
                                        strokeWidth: 1,
                                    }) :
                                    React.createElement(PlayCircleIcon, {
                                        className: `h-10 w-10`,
                                        strokeWidth: 1,
                                    })
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='text-xl'>{podcast.name}</h2>
                    <p>{podcast.description}.</p>
                </div>
            </div>
    )
}
