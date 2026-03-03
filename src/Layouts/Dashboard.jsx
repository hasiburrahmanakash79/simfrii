import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import logo from "../assets/logo/simfriiSymbol.svg";
import Logout from "../assets/icons/signout.svg";
import useMe from "../components/hook/useMe";
import apiClient from "../lib/api-client";
import { removeAuthTokens } from "../lib/cookie-utils";
import LogoutModal from "../components/LogoutModal";
import {Analytics, Home, Orders, Payment, PlanManage, ProfileUser, Settings, Support, Upload, Users } from "../assets/icons/icons";

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
      path: "/adminOverview",
      icon: (isActive) => <Home isActive={isActive} />,
      role: "admin",
    },
    {
      title: "User",
      path: "/all-user",
      icon: (isActive) => <Users isActive={isActive} />,
      role: "admin",
    },
    {
      title: "Orders",
      path: "/order",
      icon: (isActive) => <Orders isActive={isActive} />,
      role: "admin",
    },
    {
      title: "eSIM plan management",
      path: "/management",
      icon: (isActive) => <PlanManage isActive={isActive} />,
      role: "admin",
    },
    {
      title: "Payment",
      path: "/payment",
      icon: (isActive) => <Payment isActive={isActive} />,
      role: "admin",
    },
    {
      title: "Upload",
      path: "/content",
      icon: (isActive) => <Upload isActive={isActive} />,
      role: "admin",
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: (isActive) => <Analytics isActive={isActive} />,
      role: "admin",
    },
    {
      title: "Support",
      path: "/support",
      icon: (isActive) => <Support isActive={isActive} />,
      role: "admin",
    },
    {
      title: "Settings",
      path: "/settings",
      icon: (isActive) => <Settings isActive={isActive} />,
      role: "admin",
    },
    {
      title: "Dashboard",
      path: "/stuffOverview",
      icon: (isActive) => <Home isActive={isActive} />,
      role: "staff",
    },
    {
      title: "User",
      path: "/userList",
      icon: (isActive) => <Users isActive={isActive} />,
      role: "staff",
    },
    {
      title: "eSIM plan management",
      path: "/management",
      icon: (isActive) => <PlanManage isActive={isActive} />,
      role: "staff",
    },
    {
      title: "Analytics",
      path: "/issue-analytics",
      icon: (isActive) => <Analytics isActive={isActive} />,
      role: "staff",
    },
    {
      title: "Support",
      path: "/support",
      icon: (isActive) => <Support isActive={isActive} />,
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
            {filteredMenus.map((menu, index) => {
              const isActive = location.pathname === menu.path ||
                (location.pathname === "/" && menu.path.includes("Overview"));
              return (
                <Link
                  key={index}
                  to={menu.path}
                  className={`flex items-center p-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#fffaea] text-[#FF8242]"
                      : "text-gray-600 hover:bg-[#fffaea]"
                  }`}
                  aria-label={menu.title}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile after click
                >
                  {menu.icon(isActive)}
                  <span
                    className={`${
                      isSidebarOpen ? "block" : "hidden md:block"
                    } ml-3`}
                  >
                    {menu.title}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Profile and Logout */}
          <div className="p-2 absolute bottom-0 w-full bg-white">
            <div className="flex items-center justify-center gap-x-3">
              <div
                className={`flex items-center gap-x-3 p-2 text-sm ${
                  isSidebarOpen ? "flex" : "hidden md:flex"
                }`}
                aria-label="Profile"
              >
                <div>
                  <ProfileUser/>
                </div>
                <span>
                  <p className="font-bold">{me.full_name}</p>
                  <p className="text-xs hidden md:block">{me.role}</p>
                </span>
              </div>
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="text-[#FF8242] hover:text-[#ec6a29] cursor-pointer"
                aria-label="Logout"
              >
                <LogOut/>
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