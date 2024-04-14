import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AuthRedirect = () => {
  const { userData } = useSelector((state) => state.auth);

  return userData?.username ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRedirect;
