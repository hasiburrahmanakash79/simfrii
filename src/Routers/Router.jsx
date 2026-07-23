// import Main from "../Layouts/Main";
// import Homepage from "../Pages/HomePage/Homepage";
// import WorldWideESim from "../Pages/WorldWideESim/WorldWideESim";
// import CountryEsim from "../Pages/WorldWideESim/CountryEsim";
// import RegionOffers from "../Pages/HomePage/Regions/RegionOffers";
// import MyEsim from "../Pages/MyEsim/MyEsim";
// import ESIMDetails from "../Pages/MyEsim/ESIMDetails";
// import AccountSettings from "../Pages/AccountSettings/AccountSettings";
// import OrderPreview from "../Pages/OrderPreview/OrderPreview";
// import SuccessPayment from "../Pages/OrderPreview/SuccessPayment";
// import TopUp from "../Pages/TopUp/TopUp";
// import Instructions from "../Pages/Instructions/Instructions";
// import CountryWiseAllSim from "../Pages/WorldWideESim/CountryWiseAllSim";
import { createBrowserRouter } from "react-router";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import Dashboard from "../Layouts/Dashboard";
import Email from "../Pages/Authentication/Email";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import AllUser from "../Pages/AdminPages/AllUser/AllUsers";
import OrderList from "../Pages/AdminPages/OrderPage/OrderList";
import UserDetailPage from "../Pages/AdminPages/AllUser/UserDetail";
import OrderDetailPage from "../Pages/AdminPages/OrderPage/OrderDetailPage";
import OtpVerification from "../Pages/Authentication/OtpVerification";
import ContentPage from "../Pages/AdminPages/ContentPage/ContentPage";
import Payment from "../Pages/AdminPages/Payment/Payment";
import PlanManagement from "../Pages/AdminPages/PlanManagement/PlanManagement";
import CustomerSupport from "../Pages/AdminPages/CustomerSupport/CustomerSupport";
import Settings from "../Pages/AdminPages/Settings/Settings";
import Analytics from "../Pages/AdminPages/Analytics/Analytics";
import IssueAnalytics from "../Pages/StaffPages/IssueAnalytics/IssueAnalytics";
import StaffOverview from "../Pages/StaffPages/StaffOverview/StaffOverview";
import AdminOverview from "../Pages/AdminPages/AdminOverview/AdminOverview";
import UserList from "../Pages/StaffPages/UserList/UserList";
import AdminProtected from "./AdminProtected";
import StaffProtected from "./StaffProtected";
import PermissionRoute from "./PermissionRoute";
import PrivacyPolicy from "../Pages/AccountSettings/PrivacyPolicy";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        element: <AdminProtected />,
        children: [
          {
            path: "/adminOverview",
            element: <AdminOverview />,
          },

          {
            path: "/all-user",
            element: <AllUser />,
          },
          {
            path: "/userDetail/:id",
            element: <UserDetailPage />,
          },
          {
            path: "/order",
            element: <OrderList />,
          },
          {
            path: "/order-details/:id",
            element: <OrderDetailPage />,
          },
          {
            path: "/management",
            element: <PlanManagement />,
          },
          {
            path: "/payment",
            element: <Payment />,
          },
          {
            path: "/content",
            element: <ContentPage />,
          },
          {
            path: "/order-details/:id",
            element: <OrderDetailPage />,
          },
          {
            path: "/analytics",
            element: <Analytics />,
          },
          {
            path: "/support",
            element: <CustomerSupport />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },

      // Stuff dashboard
      {
        element: <StaffProtected />,
        children: [
          {
            path: "/stuffOverview",
            element: <StaffOverview />,
          },
          {
            path: "/plan_management",
            element: (
              <PermissionRoute permission="can_view_plans">
                <PlanManagement />
              </PermissionRoute>
            ),
          },
          {
            path: "/user_support",
            element:  <CustomerSupport />,
          },
          {
            path: "/userList",
            element: <PermissionRoute permission="can_view_users">
                <UserList />
              </PermissionRoute> ,
          },
          {
            path: "/issue-analytics",
            element:<PermissionRoute permission="can_view_analytics">
                <IssueAnalytics />,
              </PermissionRoute> 
          },
        ],
      },
    ],
  },

  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgat-password",
    element: <Email />,
  },
  {
    path: "/otp",
    element: <OtpVerification />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
]);

export default router;
