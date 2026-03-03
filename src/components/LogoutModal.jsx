import { LogOut } from "lucide-react";


const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex flex-col items-center py-5">
          <div className="bg-orange-100 rounded-full p-3">
            <LogOut className="text-[#FF8242] h-8 w-8"/>
          </div>
          <h1 className="text-2xl font-semibold my-4">Log Out</h1>
          <p className="text-gray-600">
            Are you sure you want to log out?
          </p>
        </div>
        <div className="flex space-x-4 mt-5">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-[#FF8242] text-white rounded-full"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;