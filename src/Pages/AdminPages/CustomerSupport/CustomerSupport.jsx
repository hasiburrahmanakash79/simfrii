import { useState, useEffect, useRef } from "react";
import useMe from "../../../components/hook/useMe";
import { getCookie } from "../../../lib/cookie-utils";
import apiClient from "../../../lib/api-client";
import {
  MessageCircleMoreIcon,
  Search,
} from "lucide-react";
const WS_URL = import.meta.env.VITE_WS_URL

const CustomerSupport = () => {
  const { me } = useMe();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [tickets, setTickets] = useState([]);
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Added for search
  const messagesEndRef = useRef(null);
  const token = getCookie("access_token");

  useEffect(() => {
    if (me && token) {
      loadTickets();
    }
  }, [me, token]);

  const loadTickets = async () => {
    try {
      const response = await apiClient.get("chats");
      console.log(response.data);
      const chats = Array.isArray(response.data) ? response.data : [];
      console.log("Fetched chats:", chats);
      const mappedTickets = chats
        .filter((chat) =>
          chat.members?.some(
            (m) =>
              m.role === "staff" || m.role === "admin",
          ),
        )
        .map((chat) => ({
          id: chat.id || chat.chat_id,
          title: chat.name || "Support Chat",
          customer:
            chat.members?.find(
              (m) =>
                m.role !== "staff" && m.role !== "admin",
            )?.role || "Unknown",
          customerName:
            chat.members?.find(
              (m) =>
                m.role !== "staff" && m.role !== "admin",
            )?.name || "Customer",
          created: chat.created_at || "Unknown",
          status: "Open",
        }));
      setTickets(mappedTickets);
    } catch (error) {
      console.error(
        "Error loading tickets:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch messages and set up WebSocket when modal opens
  useEffect(() => {
    if (isModalOpen && selectedTicket && token && me) {
      fetchMessages(selectedTicket.id);

      const wsUrl = `${WS_URL}/ws/chat/${selectedTicket.id}?token=${token}`;
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log("WebSocket connected for admin");
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const content = data.content;
          if (content && data.id) {
            const newMsg = {
              id: data.id,
              content,
              sender:
                data?.sender_id === me?.id
                  ? me?.name || "Support Team"
                  : selectedTicket.customerName,
              isCustomer: data.sender_id !== me.id,
              timestamp: data.created_at || new Date().toISOString(),
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
        console.log("WebSocket disconnected", event.code, event.reason);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
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
  }, [isModalOpen, selectedTicket, token, me]);

  const fetchMessages = async (chatId) => {
    try {
      const response = await apiClient.get(`chats/${chatId}/messages`);
      const fetchedMessages = response.data || [];
      setMessages(
        fetchedMessages.map((msg) => ({
          id: msg.id,
          content: msg.content || msg.message,
          sender:
            msg.sender?.role === "admin" || msg.sender?.role === "staff"
              ? "Support Team"
              : selectedTicket.customerName,
          isCustomer:
            msg.sender?.role !== "admin" && msg.sender?.role !== "staff",
          timestamp: msg.created_at || "Unknown",
        })),
      );
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setMessages([]); // Reset messages
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
    setReplyMessage("");
    setMessages([]);
    if (ws) {
      ws.close();
      setWs(null);
    }
  };

  const handleSendReply = () => {
    if (
      !replyMessage.trim() ||
      !selectedTicket ||
      !ws ||
      ws.readyState !== WebSocket.OPEN
    )
      return;

    ws.send(JSON.stringify({ content: replyMessage }));
    setReplyMessage("");
    // The message will be added via onmessage when the server broadcasts it
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka",
    });

    const formattedDate = date.toLocaleDateString("en-GB", {
      timeZone: "Asia/Dhaka",
    });

    return `${time}, ${formattedDate.replaceAll("/", "-")}`;
  };

  // Filter tickets based on search query
  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  console.log(tickets);

  return (
    <div className="">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium mb-2">
          Customer Support
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Handle customer support requests
        </p>
      </div>
      <div className="  max-w-6xl mx-auto">
        <div className="md:mb-10 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <span></span>
            <div className="bg-white shadow  shadow-gray-200 rounded-lg flex items-center">
              <Search className="w-5 ms-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 md:w-80 px-3 sm:px-4 py-3 text-xs sm:text-sm  outline-none"
              />
            </div>
          </div>
        </div>

        <div className=" space-y-3 sm:space-y-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-6 bg-white rounded-xl shadow-md shadow-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-[#09b285] rounded-full p-2 text-white">
                    <MessageCircleMoreIcon />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">
                      {ticket.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Create: {formatDateTime(ticket.created)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => openModal(ticket)}
                  className="w-full sm:w-auto px-4 py-1.5 text-xs sm:text-sm rounded-full bg-orange-100 text-[#EC7C0C] hover:bg-orange-200 transition-colors"
                >
                  Open
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-xs sm:text-sm">
              No tickets found.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg sm:max-w-xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2">
                Support
              </h2>
              <div className="text-red-600 space-y-1 bg-red-50 w-full p-3 rounded-lg text-xs sm:text-sm">
                <p className="font-medium">
                  {selectedTicket.id} || {selectedTicket.title}
                </p>
                <p>Customer: {selectedTicket.customer}</p>
                <p>Created: {formatDateTime(selectedTicket.created)}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 max-h-[350px] sm:max-h-[400px] overflow-y-auto space-y-3 sm:space-y-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 sm:gap-3 ${
                      message.isCustomer ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`group flex items-start gap-2 sm:gap-3 max-w-[70%] ${
                        message.isCustomer ? "" : "flex-row-reverse text-right"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium ${
                          message.isCustomer ? "bg-[#EC7C0C]" : "bg-purple-500"
                        }`}
                      >
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      {/* Message Content */}
                      <div className="relative">
                        <p
                          className={`text-xs sm:text-sm text-gray-700 leading-relaxed p-2 rounded-lg text-left ${
                            message.isCustomer ? "bg-gray-100" : "bg-purple-100"
                          }`}
                        >
                          {message.content}
                        </p>
 
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 ${
                            message.isCustomer
                              ? "left-full ml-2"  
                              : "right-full mr-2 text-right"  
                          }`}
                        >
                          {formatDateTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500 text-xs sm:text-sm">
                  No messages in this conversation yet.
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Section */}
            <div className="border-t border-gray-200 p-4">
              <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Reply to Customer
              </h3>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your response here..."
                className="w-full h-20 sm:h-24 p-3 text-xs sm:text-sm border border-gray-300 rounded-lg resize-none outline-none"
              />
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-3">
                <button
                  onClick={closeModal}
                  className="w-full sm:w-auto px-4 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-800 bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleSendReply}
                  className="w-full sm:w-auto px-4 py-1.5 text-xs sm:text-sm bg-[#EC7C0C] text-white rounded-lg hover:bg-[#d6700a] transition-colors"
                >
                  Send reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSupport;