import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedAdmin = () => {
  const { userData } = useSelector((state) => state.auth);
  return userData?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedAdmin;
