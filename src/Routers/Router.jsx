import { createBrowserRouter } from "react-router";
import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import Main from "../Layouts/Main";
import Homepage from "../Pages/HomePage/Homepage";
import OtpVerification from "../Pages/Authentication/OtpVerification";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
  // {
  //   path: "/admin",
  //   element: <Dashboard />,
  //   children: [
  //     {
  //       path: "dashboard",
  //       element: <AdminOverview/>
  //     },
  //     {
  //       path: "user",
  //       element: <AllUser/>
  //     },
  //     {
  //       path: "userDetail/:id",
  //       element: <UserDetail/>
  //     },
  //     {
  //       path: "order",
  //       element: <OrderList/>
  //     },
  //     {
  //       path: "order-details/:id",
  //       element: <OrderDetailPage/>
  //     },
  //     {
  //       path: "service",
  //       element: <AllService/>
  //     },
  //     {
  //       path: "request",
  //       element: <SellerRequest/>
  //     },
  //     {
  //       path: "request-details/:id",
  //       element: <RequestDetails/>
  //     },
  //     {
  //       path: "content",
  //       element: <ContentPage/>
  //     },
  //     {
  //       path: "add-privacy",
  //       element: <PrivacyPolicyUpload/>
  //     },
  //   ],
  // },
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
