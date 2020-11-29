import React, {useRef, useEffect} from "../web_modules/react.js";
export default function VideoPlayer({video, setCurrentTime}) {
  const vid = useRef(null);
  useEffect(() => {
    vid.current.addEventListener("timeupdate", (event) => {
      console.log("The currentTime attribute has been updated. Again.");
      console.log(vid.current.currentTime);
    });
  }, []);
  return /* @__PURE__ */ React.createElement("video", {
    ref: vid,
    controls: true,
    width: "250",
    src: URL.createObjectURL(video)
  });
}
