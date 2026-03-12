import { useState } from "react";
import useAdminUser from "../../../components/adminHook/useAdminUser";
import apiClient from "../../../lib/api-client";
import { CircleQuestionMark } from "lucide-react";
import Swal from "sweetalert2";   // ← npm install sweetalert2 (একবার রান করো)

const Settings = () => {
  const { userList, refetch } = useAdminUser();
  const staffs = userList.filter((user) => user.role === "staff");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [permissions, setPermissions] = useState({});

  const openModal = async (staff) => {

    try {
      const response = await apiClient.get(
        `/dashboard/user-permissions?user_id=${staff.id}`
      );

      const fetchedPermissions = response.data.data.permissions;
console.log(fetchedPermissions);
      setSelectedStaff(staff);
      setPermissions({
        dashboardAccess: fetchedPermissions.can_view_dashboard,
        analytics: fetchedPermissions.can_view_analytics,
        viewUsers: fetchedPermissions.can_view_users,
        editUsers: fetchedPermissions.can_edit_users,
        suspendUsers: fetchedPermissions.can_suspend_users,
        viewPlans: fetchedPermissions.can_view_plans,
        editPlans: fetchedPermissions.can_edit_plans,
      });
      setIsModalOpen(true);
    } catch (error) {
      // error handle করলে পরে toast দিতে পারবে
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
    setPermissions({});
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleUpdate = async () => {
    if (!selectedStaff) return;

    const payload = {
      user_id: selectedStaff.id,
      can_view_dashboard: permissions.dashboardAccess,
      can_view_analytics: permissions.analytics,
      can_view_users: permissions.viewUsers,
      can_edit_users: permissions.editUsers,
      can_suspend_users: permissions.suspendUsers,
      can_view_plans: permissions.viewPlans,
      can_edit_plans: permissions.editPlans,
    };

    try {
      await apiClient.patch("/dashboard/user-permissions", payload);
      console.log(payload);

      // ✅ Success Sweet Toast (Top Right)
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Permissions updated successfully!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      closeModal();
      refetch();   // ← list refresh হবে (status / data update)
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Update failed! Please try again.",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium mb-2">Settings</h1>
        <p className="text-xs sm:text-sm text-gray-600">System configuration and roles</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-5 border-b border-gray-200">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Role Management</h1>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {staffs.length > 0 ? (
            staffs.map((staff) => (
              <div
                key={staff.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-[#09b285] rounded-full p-2 text-white">
                    <CircleQuestionMark size={20} />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">{staff.full_name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{staff.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => openModal(staff)}
                  className="w-full sm:w-auto px-4 py-1.5 text-xs sm:text-sm rounded-full bg-orange-100 text-[#EC7C0C] hover:bg-orange-200 transition-colors"
                >
                  Edit Permissions
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-xs sm:text-sm">No staff members found.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Edit Permissions</h2>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-xs sm:text-sm">
                <h3 className="text-blue-600 font-medium mb-1">
                  {selectedStaff.full_name} ({selectedStaff.role})
                </h3>
                <p className="text-gray-600">Configure permissions for this user</p>
              </div>

              {/* Dashboard Access */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3">Dashboard Access</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="dashboardAccess"
                      checked={permissions.dashboardAccess || false}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-xs sm:text-sm text-gray-600">View dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="analytics"
                      checked={permissions.analytics || false}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-xs sm:text-sm text-gray-600">View analytics</span>
                  </div>
                </div>
              </div>

              {/* User Management */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3">User Management</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="viewUsers"
                      checked={permissions.viewUsers || false}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-xs sm:text-sm text-gray-600">View user accounts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="editUsers"
                      checked={permissions.editUsers || false}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-xs sm:text-sm text-gray-600">Edit user accounts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="suspendUsers"
                      checked={permissions.suspendUsers || false}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-xs sm:text-sm text-gray-600">Suspend/ban user</span>
                  </div>
                </div>
              </div>

              {/* Plan Management */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3">Plan Management</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="viewPlans"
                      checked={permissions.viewPlans || false}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-xs sm:text-sm text-gray-600">View eSIM plans</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="editPlans"
                      checked={permissions.editPlans || false}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-xs sm:text-sm text-gray-600">Create/edit plans</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button
                  onClick={closeModal}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Permissions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;