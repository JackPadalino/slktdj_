import { useEffect, useRef } from "react";
import { ListItem, ListItemText } from "@mui/material";
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
        <ListItem
          key={index}
          component="div"
          disablePadding
          className="listItem"
        >
          <ListItemText primary={`${message.username}: ${message.content}`} />
        </ListItem>
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
