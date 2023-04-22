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
import Image from "next/image";

export default function PlayerBottom() {
    const podcast = useSelector((state) => state.PodcastSlice)

    const [audio, setAudio] = useState(new Audio(podcast.fileUrl));
    const [isPlaying, setIsPlaying] = useState(true);
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
        <div className='fixed bottom-0 px-10 py-4 bg-gray-900 z-40 w-full flex justify-between text-white'>
            <audio ref={audio} src={podcast.fileUrl} />
            <div className='flex justify-start mr-10 max-w-1/2'>
                <Image src={podcast.image} width={80} height={80} alt={podcast?.title} />
                <div className="flex flex-col justify-center ml-2">
                    <h2 className='text-xl'>{podcast.title}</h2>
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
        </div>
    )
}
