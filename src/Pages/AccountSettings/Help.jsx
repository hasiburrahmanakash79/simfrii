import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SupportModal from "../Support/SupportModal";
import ChatModal from "../Support/ChatModal";
import TroubleshootingModal from "../../components/TroubleshootingModal";
export default function Help() {
  const [chatOpen, setChatOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [TroubleshootingOpen, setTroubleshootingOpen] = useState(false);

  const openSupport = () => setSupportOpen(true);
  const closeTroubleshooting = () => setTroubleshootingOpen(true);
  const closeSupport = () => setSupportOpen(false);
  const openTroubleshooting = () => setTroubleshootingOpen(false);
  const openChat = () => {
    closeSupport();
    setChatOpen(true);
  };
  const closeChat = () => setChatOpen(false);
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="">
        <h1
          className="border-b border-gray-200 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => navigate("/faq")}
        >
          FAQ
        </h1>
        <h1
          className="border-b border-gray-200 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => navigate("/troubleshooting")}
        >
          Troubleshooting
        </h1>
        <h1
          className="border-b border-gray-200 py-2 cursor-pointer hover:bg-gray-100"
          onClick={openSupport}
        >
          Support
        </h1>
      </div>
      

<TroubleshootingModal
isOpen={TroubleshootingOpen}
onClose={closeTroubleshooting}

/>
      <SupportModal
        isOpen={supportOpen}
        onClose={closeSupport}
        openChat={openChat}
      />
      <ChatModal isOpen={chatOpen} onClose={closeChat} />
    </div>
  );
}
