import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const AdmProductLayout = () => {
  return (
    <div>
      <div className="flex gap-3">
        <Link to="/adm-product">product</Link>
        <Link to="/adm-product-category">category</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AdmProductLayout;
