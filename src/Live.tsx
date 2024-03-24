import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Chat from "./Chat";
import "./live.css";

const Live = () => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  const initPlayer = async () => {
    // @ts-expect-error: because I said so!
    if (IVSPlayer.isPlayerSupported && videoPlayerRef.current) {
      // @ts-expect-error: because I said so!
      const player = await IVSPlayer.create();
      // @ts-expect-error: because I said so!
      player.addEventListener(IVSPlayer.PlayerState.PLAYING, () => {
        setIsPlaying(true);
        setHasEnded(false);
      });
      // @ts-expect-error: because I said so!
      player.addEventListener(IVSPlayer.PlayerState.ENDED, () => {
        setIsPlaying(false);
        setHasEnded(true);
      });
      player.addEventListener(
        // @ts-expect-error: because I said so!
        IVSPlayer.PlayerEventType.ERROR,
        (err: unknown) => {
          // @ts-expect-error: because I said so!
          if (err.type === "ErrorNotAvailable") {
            setIsPlaying(false);
          }
        }
      );

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
            The live stream has ended. Thanks for coming!
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
