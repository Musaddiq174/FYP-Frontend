import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Fab,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Zoom,
  Slide,
  styled
} from "@mui/material";
import { FaRobot, FaTimes, FaPaperPlane, FaComments } from "react-icons/fa";

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "350px",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  zIndex: 1000,
  "@media (max-width: 600px)": {
    width: "100%",
    height: "100%",
    bottom: 0,
    right: 0
  }
}));

const Header = styled(Box)({
  backgroundColor: "#2196f3",
  padding: "12px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#ffffff",
  height: "60px"
});

const MessagesArea = styled(Box)({
  flex: 1,
  overflow: "auto",
  padding: "20px",
  backgroundColor: "#f5f5f5"
});

const Message = styled(Box)(({ isUser }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: isUser ? "flex-end" : "flex-start",
  marginBottom: "12px"
}));

const MessageBubble = styled(Box)(({ isUser }) => ({
  backgroundColor: isUser ? "#2196f3" : "#e0e0e0",
  color: isUser ? "#ffffff" : "#000000",
  padding: "8px 16px",
  borderRadius: "18px",
  maxWidth: "70%",
  wordBreak: "break-word"
}));

const InputArea = styled(Box)({
  padding: "10px",
  backgroundColor: "#ffffff",
  borderTop: "1px solid #e0e0e0",
  height: "60px",
  display: "flex",
  alignItems: "center"
});

const FloatingButton = styled(Fab)({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 1000
});

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || inputValue.length > 500) return;

    const newMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        text: "Thank you for your message. I'm a demo chatbot.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <>
      <Zoom in={!isOpen}>
        <FloatingButton
          color="primary"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <FaComments size={24} />
        </FloatingButton>
      </Zoom>

      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <ChatContainer elevation={3}>
          <Header>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: "#1976d2" }}>
                <FaRobot />
              </Avatar>
              <Typography variant="h6">Chat Assistant</Typography>
            </Box>
            <IconButton
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              sx={{ color: "#ffffff" }}
            >
              <FaTimes />
            </IconButton>
          </Header>

          <MessagesArea>
            {messages.map((message, index) => (
              <Message key={index} isUser={message.isUser}>
                <MessageBubble isUser={message.isUser}>
                  <Typography>{message.text}</Typography>
                </MessageBubble>
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, color: "#757575" }}
                >
                  {formatTimestamp(message.timestamp)}
                </Typography>
              </Message>
            ))}
            {isTyping && (
              <Message isUser={false}>
                <MessageBubble isUser={false}>
                  <Typography>typing...</Typography>
                </MessageBubble>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </MessagesArea>

          <InputArea>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              size="small"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              inputProps={{ maxLength: 500 }}
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </IconButton>
          </InputArea>
        </ChatContainer>
      </Slide>
    </>
  );
};

export default ChatbotWidget;
