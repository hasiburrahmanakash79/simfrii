import { Send, Loader2, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { getCookie } from "../../lib/cookie-utils";
import apiClient from "../../lib/api-client";
import useMe from "../../components/hook/useMe";

const ChatModal = ({ isOpen, onClose }) => {
  const { me } = useMe();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const [ws, setWs] = useState(null);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingMessages, setPendingMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const maxReconnectAttempts = 5;

  const token = getCookie("access_token");

  // Load existing chat ID on modal open
  useEffect(() => {
    if (isOpen && chatId === null && me) {
      loadChatId();
    }
  }, [isOpen, chatId, me]);

  const loadChatId = async () => {
    try {
      const response = await apiClient.get("chats");
      const chats = Array.isArray(response.data) ? response.data : [];
      const supportChat = chats.find((chat) => chat.members.role !== "user");
      if (supportChat) {
        setChatId(supportChat.id);
      }
    } catch (error) {
      console.error(
        "Error loading chats:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Set up WebSocket once chatId is available
  useEffect(() => {
    if (chatId && token && me && reconnectAttempt < maxReconnectAttempts) {
      if (ws) {
        ws.close();
      }

      const wsUrl = `ws://10.10.12.62:7000/ws/chat/${chatId}?token=${token}`;
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log("WebSocket connected");
        setReconnectAttempt(0);
        setIsLoading(true);
        fetchMessages().finally(() => {
          setIsLoading(false);
          if (pendingMessages.length > 0) {
            pendingMessages.forEach((msg) => {
              socket.send(JSON.stringify({ content: msg }));
            });
            setPendingMessages([]);
          }
        });
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data);
          const content = data.content || data.message;
          if (content && data.id) {
            const newMsg = {
              id: data.id,
              content: content,
              sender: data.sender_id === me.id,
            };
            setMessages((prev) => {
              if (prev.some((msg) => msg.id === newMsg.id)) {
                return prev;
              }
              return [...prev, newMsg];
            });
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socket.onclose = (event) => {
        setWs(null);
        if (event.code !== 1000 && reconnectAttempt < maxReconnectAttempts) {
          // Abnormal closure
          const delay = Math.min(30000, 1000 * Math.pow(2, reconnectAttempt));
          setTimeout(() => {
            setReconnectAttempt((prev) => prev + 1);
          }, delay);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        socket.close();
      };

      setWs(socket);

      return () => {
        if (
          socket.readyState === WebSocket.OPEN ||
          socket.readyState === WebSocket.CONNECTING
        ) {
          socket.close();
        }
      };
    }
  }, [chatId, token, me, reconnectAttempt, pendingMessages]);

  // Fetch initial messages for the chat
  const fetchMessages = async () => {
    try {
      const response = await apiClient.get(`chats/${chatId}/messages`);
      const fetchedMessages = response.data || []; // Assuming response.data is the array of messages
      setMessages(
        fetchedMessages.map((msg) => ({
          chatId: msg.chat,
          id: msg.id,
          content: msg.content || msg.message,
          sender: msg.sender.id === me.id,
        }))
      );
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Create group chat
  const createGroup = async () => {
    try {
      const response = await apiClient.post("chats/group", {
        name: "Support Chat",
        members: ["support"], // Adjust if backend expects emails or IDs instead of "support"
      });
      const newChatId = response.data.id || response.data.chat_id;
      setChatId(newChatId);
      return newChatId;
    } catch (error) {
      console.error(
        "Error creating group:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };

  // Handle sending message
  const sendMessage = async () => {
    if (!input.trim() || !token || !me) return;
    const userMessage = input;
    setInput("");

    let currentChatId = chatId;
    if (!currentChatId) {
      currentChatId = await createGroup();
      if (!currentChatId) return; // Failed to create group
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ content: userMessage }));
    } else {
      setPendingMessages((prev) => [...prev, userMessage]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg h-[80vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-512.png"
              alt="AI Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold text-gray-800">Support Team</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-orange-400" size={32} />
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender ? "justify-end " : "justify-start"
                }`}
              >
                {!msg.sender && (
                  <div className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center mr-1">
                    <p className="text-white text-sm">ST</p>
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-3 py-1 rounded-2xl ${
                    msg.sender
                      ? "bg-orange-400 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center p-4 border-t rounded-2xl border-gray-200 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-2 bg-orange-300 text-white rounded-full hover:bg-orange-400 transition"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
