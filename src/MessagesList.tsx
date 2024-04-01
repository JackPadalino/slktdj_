import { useEffect, useRef } from "react";
import { ListItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Virtuoso } from "react-virtuoso";
import "./messagesList.css";

interface Message {
  content: string;
  timestamp: string;
  username: string;
}

interface MessagePops {
  chatMessages: Message[];
}

const theme = createTheme();

theme.typography.h6 = {
  fontFamily: "Times New Roman",
  textAlign: "center",
  fontSize: "16px",
  color: "limegreen",
};

const MessagesList = ({ chatMessages }: MessagePops) => {
  const virtuosoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // scroll to the bottom when chatMessages change
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (virtuosoRef.current) {
      // @ts-expect-error: because I said so!
      virtuosoRef.current.scrollToIndex({
        index: chatMessages.length - 1,
        behavior: "smooth",
      });
    }
  };

  return (
    <Virtuoso
      // @ts-expect-error: because I said so!
      ref={virtuosoRef}
      className="virtuosoList"
      style={{ height: 200 }}
      data={chatMessages}
      itemContent={(index, message) => (
        <ThemeProvider theme={theme}>
          <ListItem key={index} component="div" disablePadding>
            <Typography variant="h6">{`${message.username}: ${message.content}`}</Typography>
          </ListItem>
        </ThemeProvider>
      )}
      atBottomStateChange={(atBottom) => {
        // scroll to the bottom if not at bottom of chat
        if (!atBottom) {
          scrollToBottom();
        }
      }}
    />
  );
};

export default MessagesList;
