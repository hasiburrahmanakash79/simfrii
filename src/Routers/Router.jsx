import { createBrowserRouter } from "react-router";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import Main from "../Layouts/Main";
import Homepage from "../Pages/HomePage/Homepage";
import OtpVerification from "../Pages/Authentication/OtpVerification";
import WorldWideESim from "../Pages/WorldWideESim/WorldWideESim";
import CountryEsim from "../Pages/WorldWideESim/CountryEsim";
import RegionOffers from "../Pages/HomePage/Regions/RegionOffers";
import MyEsim from "../Pages/MyEsim/MyEsim";
import ESIMDetails from "../Pages/MyEsim/ESIMDetails";
import AccountSettings from "../Pages/AccountSettings/AccountSettings";
import Dashboard from "../Layouts/Dashboard";
import AdminOverview from "../Pages/AdminPages/AdminOverview";
import OrderPreview from "../Pages/OrderPreview/OrderPreview";
import SuccessPayment from "../Pages/OrderPreview/SuccessPayment";
import TopUp from "../Pages/TopUp/TopUp";
import Instructions from "../Pages/Instructions/Instructions";
import Email from "../Pages/Authentication/Email";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import AllUser from "../Pages/AdminPages/AllUser/AllUsers";
import OrderList from "../Pages/AdminPages/OrderPage/OrderList";
import UserDetailPage from "../Pages/AdminPages/AllUser/UserDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/worldwide",
        element: <WorldWideESim />,
      },
      {
        path: "/worldwide-esim/:countryName",
        element: <CountryEsim />,
      },
      {
        path: "/region/:regionName",
        element: <RegionOffers />,
      },
      {
        path: "/my-esim",
        element: <MyEsim />,
      },
      {
        path: "/package-details",
        element: <ESIMDetails />,
      },
      {
        path: "/instruction",
        element: <Instructions />,
      },
      {
        path: "/top-up/:id",
        element: <TopUp />,
      },
      {
        path: "/settings",
        element: <AccountSettings />,
      },
      {
        path: "/order-preview/:id",
        element: <OrderPreview />,
      },
      {
        path: "/payment-successful",
        element: <SuccessPayment />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Dashboard />,
    children: [
      {
        path: "dashboard",
        element: <AdminOverview />,
      },
      {
        path: "user",
        element: <AllUser />,
      },
      {
        path: "userDetail/:id",
        element: <UserDetailPage />,
      },
      {
        path: "order",
        element: <OrderList />,
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
    path: "/email",
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
]);

export default router;
