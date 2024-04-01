import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
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
      <Box className="liveTopContainer">
        <img
          className="speaker"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/speaker.gif"
        />
        <img
          className="djGuy"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/dj.gif"
        />
        <Box className="welcomeConstructionContainer">
          <img
            className="slktWebsiteTitle"
            src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/slktdjwebsite.jpg"
          />
          <img
            className="constructionImg"
            src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/construction.gif"
          />
        </Box>
        <img
          className="djGuy"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/dj.gif"
        />
        <img
          className="speaker"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/speaker.gif"
        />
      </Box>

      <Box className="liveMiddleContainer">
        <img
          className="middleLevel"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/level.gif"
        />
        <Box className="liveMiddlePlayer">
          <video
            ref={videoPlayerRef}
            className="player"
            id="video-player"
            playsInline
            controls
          ></video>
        </Box>
        <img
          className="middleLevel"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/level.gif"
        />
      </Box>
      <Box className="liveBottomContainer">
        <Box className="counterContainer">
          <img
            className="goku1"
            src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/kamehameha.gif"
          />
          <p>You are user </p>
          <img
            className="userCounter"
            src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/counter.jpeg"
          />
          <img
            className="goku2"
            src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/kamehameha.gif"
          />
        </Box>
        <Chat isPlaying={isPlaying} hasEnded={hasEnded} />
      </Box>
    </Box>
  );
};

export default Live;
