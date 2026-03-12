import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../Layouts/LoadingSpinner";
import { getCookie } from "../lib/cookie-utils";
import useMe from "../components/hook/useMe";

const StaffProtected = () => {
  const accessToken = getCookie("access_token");
  const { me, loading, error } = useMe();
  console.log(me);

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }


  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !me) {
    return <Navigate to="/signin" replace />;
  }

  if (me.role !== "staff") {
    return <Navigate to="/stuffOverview" replace />;
  }

  return <Outlet />;
};

export default StaffProtected;