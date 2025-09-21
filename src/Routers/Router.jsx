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
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <AdminOverview />,
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
    path: "/otp",
    element: <OtpVerification />,
  },
]);

export default router;
