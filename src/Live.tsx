import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Chat from "./Chat";
import "./live.css";

const Live = () => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  const initPlayer = async () => {
    if (IVSPlayer.isPlayerSupported && videoPlayerRef.current) {
      const player = await IVSPlayer.create();

      player.addEventListener(IVSPlayer.PlayerState.PLAYING, () => {
        setIsPlaying(true);
        setHasEnded(false);
      });

      player.addEventListener(IVSPlayer.PlayerState.ENDED, () => {
        setIsPlaying(false);
        setHasEnded(true);
      });

      player.addEventListener(IVSPlayer.PlayerEventType.ERROR, (err: any) => {
        if (err.type === "ErrorNotAvailable") {
          setIsPlaying(true);
        }
      });

      player.attachHTMLVideoElement(videoPlayerRef.current);
      player.load(import.meta.env.VITE_LIVE_STREAM_LINK);
      player.play();

      return () => {
        player.pause();
      };
    }
  };

  useEffect(() => {
    initPlayer();
  }, []);

  return (
    <Box className="liveMainContainer">
      <Box className="phantomContainer" />
      <Box className="playerContainer">
        <video
          ref={videoPlayerRef}
          className="player"
          id="video-player"
          playsInline
          controls
        ></video>
        {!isPlaying && !hasEnded && (
          <Typography variant="h6">
            Looks likes nothing is playing! Check back soon or refresh your
            browser.
          </Typography>
        )}
        {hasEnded && (
          <Typography variant="h6">
            Our live stream has ended. Thanks for coming!
          </Typography>
        )}
      </Box>
      <Box className="chatContainer">
        <Chat isPlaying={isPlaying} />
      </Box>
    </Box>
  );
};

export default Live;
