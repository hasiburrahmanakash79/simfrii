import { Navigate } from "react-router-dom";
import useMe from "../components/hook/useMe";

const PermissionRoute = ({ children, permission }) => {
  const { me, loading } = useMe();

  if (loading) return null;

  const hasPermission = me?.permissions?.[permission];

  if (!hasPermission) {
    return <Navigate to="/user_support" replace />;
  }

  return children;
};

export default PermissionRoute;