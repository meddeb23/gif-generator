import React, { useRef, useEffect } from 'react'

export default function VideoPlayer({ video, setCurrentTime }) {
    const vid = useRef(null);
    useEffect(() => {
        vid.current.addEventListener('timeupdate', (event) => {
            console.log('The currentTime attribute has been updated. Again.');
            console.log(vid.current.currentTime)
        });
    }, [])
    return (
        <video ref={vid} controls width="250" src={URL.createObjectURL(video)} />
    )
}
