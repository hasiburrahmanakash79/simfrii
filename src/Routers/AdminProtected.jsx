import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../Layouts/LoadingSpinner";
import { getCookie } from "../lib/cookie-utils";
import useMe from "../components/hook/useMe";

const AdminProtected = () => {
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

  if (me.role !== "admin") {
    return <Navigate to="/company" replace />;
  }

  return <Outlet />;
};

export default AdminProtected;
