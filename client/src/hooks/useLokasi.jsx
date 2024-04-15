import { useLocation } from "react-router";

const useLokasi = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  return [path];
};

export default useLokasi;
