import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { H1 } from "../../components/Tags";

const ProtectedAdmin = () => {
  const { userData } = useSelector((state) => state.auth);
  return userData?.role === "admin" ? (
    <div>
      <H1>Dashboard</H1>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedAdmin;
