import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  MapPin,
  Mail,
  User,
  IdCard,
  Phone,
  Shield,
} from "lucide-react";
import { useState, useMemo } from "react";
import SectionTitle from "../../../components/SectionTitle";
import useAdminUser from "../../../components/adminHook/useAdminUser";
import apiClient from "../../../lib/api-client";

export default function AllUsers() {
  // Assume useAdminUser returns refetch function for refreshing data after updates
  const { userList, loading, refetch } = useAdminUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const avatarColors = [
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
    "bg-blue-100 text-blue-600",
    "bg-yellow-100 text-yellow-600",
    "bg-pink-100 text-pink-600",
    "bg-indigo-100 text-indigo-600",
    "bg-red-100 text-red-600",
    "bg-orange-100 text-orange-600",
    "bg-teal-100 text-teal-600",
  ];

  const formatDate = (dateStr) => {
    if (!dateStr?.trim()) return "N/A";
    const date = new Date(dateStr);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = (hours % 12 || 12).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${hour12}:${minutes} ${ampm}, ${day} ${month} ${year}`;
  };

  const filteredUsers = useMemo(
    () =>
      userList.filter(
        (user) =>
          user?.full_name
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase()) ||
          user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          user?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
      ),
    [userList, searchQuery],
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handlePageChange = (page) => setCurrentPage(page);
  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleOpenEdit = () => {
    setEditRole(selectedUser.role || "user");
    setEditStatus(selectedUser.status || "active");
    setShowEditModal(true);
    setShowDetailsModal(false);
  };

  const handleSubmitEdit = async () => {
    try {
      await apiClient.patch("/dashboard/user-list", {
        user_id: selectedUser.id,
        role: editRole,
        status: editStatus,
      });
      setShowEditModal(false);
      refetch(); // Refresh the user list after update
    } catch (error) {
      console.error("Failed to update user:", error);
      // Handle error (e.g., show toast or alert)
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) buttons.push(renderButton(i));
    } else {
      buttons.push(renderButton(1));
      if (currentPage > 3)
        buttons.push(
          <span key="ellipsis1" className="text-gray-500 text-xs sm:text-sm">
            ...
          </span>,
        );
      for (let i = start; i <= end; i++) buttons.push(renderButton(i));
      if (currentPage < totalPages - 2)
        buttons.push(
          <span key="ellipsis2" className="text-gray-500 text-xs sm:text-sm">
            ...
          </span>,
        );
      buttons.push(renderButton(totalPages));
    }
    return buttons;
  };

  const renderButton = (i) => (
    <button
      key={i}
      onClick={() => handlePageChange(i)}
      className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-medium rounded-md transition-colors ${
        currentPage === i
         ? "bg-gradient-to-b from-[#FFA943] to-[#E97400] text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      {i}
    </button>
  );

  if (loading) {
    return <div className="text-center py-10">Loading users...</div>;
  }

  return (
    <div>
      <SectionTitle
        title="User Management"
        description="Track, manage and forecast your customers and orders."
      />
      <div className="border border-gray-200 p-4 sm:p-5 rounded-2xl bg-white">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3">
            <h1 className="text-lg sm:text-xl md:text-2xl font-medium">
              All Users
            </h1>
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} results
          </p>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <div className="hidden sm:block bg-white rounded-xl">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joining Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleOpenDetails(user)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                            avatarColors[
                              user.id.charCodeAt(0) % avatarColors.length
                            ]
                          }`}
                        >
                          {user?.full_name
                            ? user.full_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "N/A"}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {user.full_name?.trim() || "N/A"}
                          </p>
                          <p className="text-xs text-gray-400">
                            USER ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {user.email?.trim() || "N/A"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {user.phone_number?.trim() || "N/A"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {formatDate(user.joined_date)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {user.location?.trim() || "N/A"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap capitalize text-xs sm:text-sm text-gray-900">
                      {user.role?.trim() || "N/A"}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap capitalize">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "suspended"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status?.trim() || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
                {!currentUsers.length && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 sm:px-6 py-12 text-center text-gray-500 text-xs sm:text-sm"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="sm:hidden space-y-4">
            {currentUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleOpenDetails(user)}
                className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        avatarColors[
                          user.id.charCodeAt(0) % avatarColors.length
                        ]
                      }`}
                    >
                      {user?.full_name
                        ? user.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "N/A"}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {user.full_name?.trim() || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.email?.trim() || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="font-medium text-gray-700">
                      Joining Date:
                    </span>{" "}
                    {formatDate(user.joined_date)}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>{" "}
                    {user.location?.trim() || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>{" "}
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "suspended"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status?.trim() || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {!currentUsers.length && (
              <div className="text-center text-gray-500 text-sm py-6">
                No users found.
              </div>
            )}
          </div>
        </div>
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 gap-3">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
               className={`flex items-center px-3 py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
                      currentPage  === 1
                        ? "text-orange-200 cursor-not-allowed"
                        : "text-orange-500 hover:bg-orange-100"
                    }`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </button>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {renderPaginationButtons()}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
                      currentPage === totalPages
                        ? "text-orange-200 cursor-not-allowed"
                        : "text-orange-500 hover:bg-orange-100"
                    }`}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="flex items-center justify-center  max-w-md w-full">
            {/* User Info */}
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
                <div className="text-center mb-4 sm:mb-6">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    {selectedUser.full_name?.trim() || "N/A"}
                  </h1>
                  <div className="space-y-2 sm:space-y-3 text-left">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">
                        {selectedUser.phone_number?.trim() || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <IdCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">
                        {selectedUser.id}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">
                        {selectedUser.email?.trim() || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">
                        {selectedUser.location?.trim() || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">
                        {formatDate(selectedUser.joined_date)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">
                        <span className="font-medium">Role:</span>{" "}
                        {selectedUser.role?.trim() || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">
                        <span className="font-medium">Status:</span>{" "}
                        {selectedUser.status?.trim() || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleOpenEdit}
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-medium mb-4">Edit User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitEdit}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
