import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Chat from "./Chat";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./live.css";

const Live = () => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  const theme = createTheme();

  theme.typography.h6 = {
    fontFamily: "Times New Roman",
    textAlign: "center",
    fontSize: "20px",
    color: "limegreen",
    // "@media (min-width: 600px) and (max-width: 1280px)": {
    //   fontSize: "16px",
    // },
    // "@media (min-width:1280px)": {
    //   fontSize: "16px",
    // },
  };

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
          className="siteGif"
          id="gif1"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/computer.gif"
        />
        <img
          className="siteGif"
          id="gif2"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/matrixcode.gif"
        />
        <img
          className="siteGif"
          id="gif3"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/mullen.gif"
        />
        <img
          className="siteGif"
          id="gif4"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/hamburglar.gif"
        />
      </Box>

      <Box className="liveMiddleContainer">
        <Box className="liveMiddlePlayer">
          <video
            ref={videoPlayerRef}
            className="player"
            id="video-player"
            playsInline
            controls
          ></video>
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </Box>
      </Box>
      <Box className="liveBottomContainer">
        <img
          className="siteGif"
          id="gif5"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/kramer.gif"
        />
        <img
          className="siteGif"
          id="gif6"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/meltingface.gif"
        />
        <img
          className="siteGif"
          id="gif7"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/ufo.gif"
        />
        <img
          className="siteGif"
          id="gif8"
          src="https://slktdj-s3-bucket.s3.amazonaws.com/graphics/tonyhawk.gif"
        />
        <Box className="liveChatContainer">
          <Chat isPlaying={isPlaying} />
        </Box>
      </Box>
    </Box>
  );
};

export default Live;
