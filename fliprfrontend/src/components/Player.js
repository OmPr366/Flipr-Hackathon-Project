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
    XMarkIcon
} from "@heroicons/react/24/outline";
import axios from 'axios'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcast } from "@/utils/Redux/PodcastSlice";

export default function Player() {
    const podcast = useSelector((state) => state.PodcastSlice)

    const [audio] = useState(new Audio(podcast.url));
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [audio]);
    function handleTimeUpdate() {
        setCurrentTime(audio.currentTime);
    }
    function handleLoadedMetadata() {
        setDuration(audio.duration);
    }
    function handlePlayPause() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
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
        dispatch(setPodcast(null))
    }
    return (
        <div className='fixed p-8 bg-gray-900 z-40 inset-x-0 mx-auto rounded flex flex-col justify-between' style={{ width: '600px' }}>
            <XMarkIcon className='h-10 w-10 cursor-pointer absolute right-2 top-2' strokeWidth='1' onClick={closePodcast} />
            <audio ref={audio} src={podcast.url} />
            <div>
                <div className='flex justify-center'>
                    <img style={{ width: '300px', height: '300px' }} className='rounded' src={podcast.img} />
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
