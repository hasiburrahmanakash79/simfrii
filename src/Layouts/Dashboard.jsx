import { useState } from "react";
import user from '../assets/images/user.png'
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo/simFriiIcon.svg";
import Logout from "../assets/icons/signout.svg";
import HomeIconSvg from "../assets/icons/Home.svg";
import UserIconSvg from "../assets/icons/Users.svg";
import SimIconSvg from "../assets/icons/simcard.svg";
import OrderIconSvg from "../assets/icons/order.svg";
import PaymentIconSvg from "../assets/icons/payment.svg";
import CloudIconSvg from "../assets/icons/cloud.svg";
import AnalyticsIconSvg from "../assets/icons/analytics.svg";
import SupportIconSvg from "../assets/icons/support.svg";
import SettingIconSvg from "../assets/icons/setting.svg";
import useMe from "../components/hook/useMe";
import apiClient from "../lib/api-client";
import { removeAuthTokens } from "../lib/cookie-utils";
import LogoutModal from "../components/LogoutModal";

const Dashboard = () => {
  const { me } = useMe();
  console.log(me);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const userRole = localStorage.getItem("userRole") || "staff";

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/sign-out", {
        user_id: me?.id,
      });
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      removeAuthTokens();
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      setShowLogoutModal(false);
      navigate("/signin");
    }
  };

  const menus = [
    {
      title: "Dashboard",
      path: "/dashboard/adminOverview",
      icon: HomeIconSvg,
      role: "Admin",
    },
    {
      title: "User",
      path: "/dashboard/userList",
      icon: UserIconSvg,
      role: "Admin",
    },
    {
      title: "Orders",
      path: "/dashboard/order",
      icon: OrderIconSvg,
      role: "Admin",
    },
    {
      title: "eSIM plan management",
      path: "/dashboard/management",
      icon: SimIconSvg,
      role: "Admin",
    },
    {
      title: "Payment",
      path: "/dashboard/payment",
      icon: PaymentIconSvg,
      role: "Admin",
    },
    {
      title: "Upload",
      path: "/dashboard/content",
      icon: CloudIconSvg,
      role: "Admin",
    },
    {
      title: "Analytics",
      path: "/dashboard/analytics",
      icon: AnalyticsIconSvg,
      role: "Admin",
    },
    {
      title: "Support",
      path: "/dashboard/support",
      icon: SupportIconSvg,
      role: "Admin",
    },
    {
      title: "Settings",
      path: "/dashboard/settings",
      icon: SettingIconSvg,
      role: "Admin",
    },
    {
      title: "Dashboard",
      path: "/dashboard/stuffOverview",
      icon: HomeIconSvg,
      role: "staff",
    },
    {
      title: "User",
      path: "/dashboard/userList",
      icon: UserIconSvg,
      role: "staff",
    },
    {
      title: "eSIM plan management",
      path: "/dashboard/sim-plan",
      icon: SimIconSvg,
      role: "staff",
    },
    {
      title: "Analytics",
      path: "/dashboard/issue-analytics",
      icon: AnalyticsIconSvg,
      role: "staff",
    },
    {
      title: "Support",
      path: "/dashboard/support",
      icon: SupportIconSvg,
      role: "staff",
    },
  ];

  const filteredMenus = menus.filter((menu) => menu.role === userRole);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg border-r border-gray-200 transition-all duration-300 md:w-64 ${
          isSidebarOpen ? "w-64" : "w-16"
        } md:inset-y-0`}
      >
        {/* Toggle Button (Mobile Only) */}
        <button
          className="md:hidden p-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo Section */}
          <div className="p-2 flex flex-col items-center justify-center mt-7">
            <img src={logo} alt="Logo" className="w-12 md:w-24" />
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-2 flex-1">
            {filteredMenus.map((menu, index) => (
              <Link
                key={index}
                to={menu.path}
                className={`flex items-center p-2 text-sm rounded-lg transition-colors ${
                  location.pathname === menu.path ||
                  (location.pathname === "/dashboard" &&
                    menu.path.includes("Overview"))
                    ? "bg-[#fffaea] text-[#ff9900]"
                    : "text-gray-600 hover:bg-[#fffaea]"
                }`}
                aria-label={menu.title}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile after click
              >
                <img
                  src={menu.icon}
                  alt={`${menu.title} icon`}
                  className="w-6 h-6"
                />
                <span
                  className={`${
                    isSidebarOpen ? "block" : "hidden md:block"
                  } ml-3`}
                >
                  {menu.title}
                </span>
              </Link>
            ))}
          </nav>

          {/* Profile and Logout */}
          <div className="p-2 absolute bottom-2 w-full">
            <div className="flex items-center justify-center gap-x-3">
              <div
                className={`flex items-center gap-x-3 p-2 text-sm ${
                  isSidebarOpen ? "flex" : "hidden md:flex"
                }`}
                aria-label="Profile"
              >
                <div>
                  <img
                    src={
                      me?.avatar && me.avatar.trim() !== ""
                        ? me.avatar
                        : user
                    }
                    alt="Profile"
                    className="md:w-10 w-7 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null; // prevent infinite loop
                      e.currentTarget.src = user
                    }}
                  />
                </div>
                <span>
                  <p className="font-bold">{me.full_name}</p>
                  <p className="text-xs hidden md:block">{me.role}</p>
                </span>
              </div>
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="text-gray-600 hover:text-[#4776EB] cursor-pointer"
                aria-label="Logout"
              >
                <img src={Logout} alt="Logout" className="w-10" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50 pl-16 md:pl-64 transition-all duration-300">
        <div className="p-4 md:p-5">
          <Outlet />
        </div>
      </main>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Dashboard;