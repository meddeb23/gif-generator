import React, {useState, useEffect, useRef} from "../web_modules/react.js";
import "./App.css.proxy.js";
import {createFFmpeg, fetchFile} from "../web_modules/@ffmpeg/ffmpeg.js";
const ffmpeg2 = createFFmpeg({log: true});
function App2() {
  const vid = useRef(null);
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [msg, setMsg] = useState("Loading All Tools");
  const [ConvertingLoad, setConvertingLoad] = useState(false);
  const [gifLength, setGifLength] = useState("2.5");
  const [error, setError] = useState(null);
  const load = async () => {
    await ffmpeg2.load();
    setReady(true);
  };
  const convertToGif = async () => {
    ffmpeg2.FS("writeFile", "test.mp4", await fetchFile(video));
    await ffmpeg2.run("-i", "test.mp4", "-t", gifLength, "-ss", String(vid.current.currentTime).slice(0, 3), "-f", "gif", "out.gif");
    const data = ffmpeg2.FS("readFile", "out.gif");
    const url = URL.createObjectURL(new Blob([data.buffer], {type: "image/gif"}));
    setGif(url);
  };
  const onSetGifLength = (e) => {
    let length = e.target.value;
    if (!parseFloat(length) && length !== "") {
      setError("Gif length should be a float number");
      setGifLength("2.5");
    } else if (parseFloat(length) > 10 || parseFloat(length) < 1) {
      setError("Gif length should be between 0s and 10s");
      setGifLength("2.5");
    } else {
      length = length.indexOf(".") === -1 ? length : length.slice(0, length.indexOf(".") + 2);
      setGifLength(length === "" ? "2.5" : length);
    }
  };
  const changeLoading = () => {
    setTimeout(() => {
      if (!ready) {
        setMsg("Almost There!");
      }
    }, 5e3);
    setTimeout(() => {
      if (!ready) {
        setMsg("This is taking so long!");
      }
    }, 1e4);
  };
  useEffect(() => {
    load();
    changeLoading();
  }, []);
  useEffect(() => {
    if (video) {
      vid.current.addEventListener("timeupdate", (event) => {
        console.log("The currentTime attribute has been updated. Again.");
        console.log(vid.current.currentTime);
      });
    }
  }, [video]);
  return ready ? /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("h1", null, "Create Gifs from your own videos"), video && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("video", {
    ref: vid,
    controls: true,
    width: "250",
    src: URL.createObjectURL(video)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "result"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "option"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "length"
  }, "Gif length"), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    placeholder: `default ${gifLength}`,
    style: {display: "block"},
    onChange: (e) => onSetGifLength(e)
  })), /* @__PURE__ */ React.createElement("p", {
    style: {
      margin: " 0 0 1rem",
      color: error ? "#cc0000" : "#cbcbcb"
    }
  }, /* @__PURE__ */ React.createElement("i", null, error ? error : "Gif length should be between 0s and 10s")), /* @__PURE__ */ React.createElement("button", {
    onClick: convertToGif
  }, "Convert"), ConvertingLoad && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", null, "Result"), /* @__PURE__ */ React.createElement("div", {
    className: "loading",
    style: {height: "auto"}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "loadingio-spinner-eclipse-tl18qrapo1f"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "ldio-u6wmgzlxuh9"
  }, /* @__PURE__ */ React.createElement("div", null))), /* @__PURE__ */ React.createElement("h3", null, "Preparing your gif"))), gif && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", null, "Result"), /* @__PURE__ */ React.createElement("img", {
    src: gif,
    width: "250",
    style: {marginBottom: "10px"}
  }), /* @__PURE__ */ React.createElement("a", {
    className: "btn",
    href: gif,
    download: "MyGif(By Gif Generator)"
  }, "download")))), !video && /* @__PURE__ */ React.createElement("div", {
    className: "warpper"
  }, /* @__PURE__ */ React.createElement("label", {
    className: "label"
  }, /* @__PURE__ */ React.createElement("svg", {
    className: "icon",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
  })), /* @__PURE__ */ React.createElement("span", {
    className: "mt-2 text-base leading-normal"
  }, "Select a video"), /* @__PURE__ */ React.createElement("input", {
    type: "file",
    name: "video",
    onChange: (e) => setVideo(e.target.files?.item(0))
  })))) : /* @__PURE__ */ React.createElement("div", {
    className: "loading"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "loadingio-spinner-eclipse-tl18qrapo1f"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "ldio-u6wmgzlxuh9"
  }, /* @__PURE__ */ React.createElement("div", null))), /* @__PURE__ */ React.createElement("h1", null, msg));
}
export default App2;
