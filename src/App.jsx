import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
// import VideoPlayer from './DragAndDrop';
const ffmpeg = createFFmpeg({ log: true });

function App() {
  const vid = useRef(null);

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState()
  const [currentTime, setCurrentTime] = useState(0);
  const [msg, setMsg] = useState('Loading All Tools')
  const [ConvertingLoad, setConvertingLoad] = useState(false);
  const [gifLength, setGifLength] = useState("2.5");
  const [error, setError] = useState(null);
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }
  const convertToGif = async () => {
    // setGif(null)
    // setConvertingLoad(true)

    //write the file to memory
    ffmpeg.FS('writeFile', "test.mp4", await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run('-i', 'test.mp4', '-t', gifLength, '-ss', String(vid.current.currentTime).slice(0, 3), '-f', 'gif', 'out.gif');

    // Read the result
    const data = ffmpeg.FS('readFile', 'out.gif');

    // Create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    // setConvertingLoad(false)

    setGif(url);
  }
  const onSetGifLength = (e) => {
    let length = e.target.value;
    if (!parseFloat(length) && length !== "") {
      setError("Gif length should be a float number");
      setGifLength("2.5")
    }
    else if (parseFloat(length) > 10 || parseFloat(length) < 1) {
      setError("Gif length should be between 0s and 10s");
      setGifLength("2.5")
    }
    else {
      length = length.indexOf('.') === -1 ? length : length.slice(0, length.indexOf('.') + 2)
      setGifLength(length === "" ? "2.5" : length)
    }
    // console.log(gifLength)
  }
  const changeLoading = () => {
    setTimeout(() => {
      if (!ready) {
        setMsg('Almost There!')
      }
    }, 5000);
    setTimeout(() => {
      if (!ready) {
        setMsg('This is taking so long!')
      }
    }, 10000);
  }

  useEffect(() => {
    load();
    changeLoading();
  }, [])
  useEffect(() => {
    if (video) {
      vid.current.addEventListener('timeupdate', (event) => {
        console.log('The currentTime attribute has been updated. Again.');
        console.log(vid.current.currentTime)
      });
    }
  }, [video])


  return (ready ?
    <div className="App">
      <h1>Create Gifs from your own videos</h1>

      {
        video && <>
          <video ref={vid} controls width="250" src={URL.createObjectURL(video)} />

          {/* <VideoPlayer setCurrentTime={setCurrentTime} video={video} /> */}
          <div className="result">
            <div className="option">
              <label htmlFor="length">Gif length</label>
              <input type="text"
                placeholder={`default ${gifLength}`}
                style={{ display: 'block' }}
                onChange={e => onSetGifLength(e)} />
            </div>
            <p style={{
              margin: " 0 0 1rem",
              color: error ? "#cc0000" : "#cbcbcb"
            }}><i>{error ? error : "Gif length should be between 0s and 10s"}</i></p>
            <button onClick={convertToGif}>Convert</button>

            {ConvertingLoad && <>
              <h3>Result</h3>
              <div className="loading" style={{ height: "auto" }}>
                <div className="loadingio-spinner-eclipse-tl18qrapo1f">
                  <div className="ldio-u6wmgzlxuh9">
                    <div></div>
                  </div></div>
                <h3>Preparing your gif</h3>
              </div>
            </>}

            {gif && <>
              <h3>Result</h3>
              <img src={gif} width="250" style={{ marginBottom: "10px" }} />
              <a className="btn" href={gif} download="MyGif(By Gif Generator)">download</a>
            </>}
          </div></>
      }
      {!video && <div className="warpper">
        <label className="label">
          <svg className="icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a video</span>
          <input type="file" name="video" onChange={(e) => setVideo(e.target.files?.item(0))} />
        </label>
      </div>}



    </div> :
    <div className="loading">
      <div className="loadingio-spinner-eclipse-tl18qrapo1f">
        <div className="ldio-u6wmgzlxuh9">
          <div></div>
        </div></div>
      <h1>{msg}</h1>
    </div>
  );
}

export default App;
