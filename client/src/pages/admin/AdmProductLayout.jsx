import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import useLokasi from "../../hooks/useLokasi";

const AdmProductLayout = () => {
  const [active, setActive] = useState(null);
  const [path] = useLokasi();

  const menus = [
    { to: "adm-product", text: "Product" },
    { to: "adm-product-category", text: "Category" },
  ];
  const handleActive = (item) => {
    setActive(item);
  };

  useEffect(() => {
    setActive(path[1]);
  }, [path]);
  return (
    <div>
      <div className="flex gap-3 py-2">
        {menus.map((item, i) => (
          <Link
            key={i}
            to={`/${item.to}`}
            onClick={() => handleActive(item.to)}
            className={`${active === item.to ? "text-cyan-600" : ""}`}
          >
            {item.text}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default AdmProductLayout;
