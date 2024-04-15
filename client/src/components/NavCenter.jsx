import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenNav } from "../app/features/basicSlice";
import { NavLink } from "react-router-dom";
// import { useEffect } from "react";

const navMenus = ["home", "product", "blog", "movie"];

export const NavBtn = ({ className }) => {
  const { openNav } = useSelector((state) => state.basic);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleOpenNav());
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} ${openNav ? "rotate-180" : ""} block sm:hidden text-xl transition-all duration-150`}
    >
      {openNav ? <FaTimes /> : <FaBars />}
    </button>
  );
};
NavBtn.propTypes;

export const NavCollapse = () => {
  const { dark, openNav } = useSelector((state) => state.basic);
  //   useEffect(() => {
  //     console.log(openNav);
  //   }, [openNav]);
  return (
    <div
      className={`block sm:hidden overflow-hidden ${dark ? "bg-slate-800" : "bg-white"} ${
        openNav ? "h-56 pb-5 pt-2 border-b" : "h-0 pb-0 pt-0 border-none"
      } z-40 flex flex-col sticky top-16 px-3 rounded-b-lg shadow transition-all duration-150`}
    >
      {navMenus.map((item, i) => (
        <NavContent key={i} item={item} className={"py-3 border-b"} />
      ))}
    </div>
  );
};

export const NavMain = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex gap-3 md:gap-5 ml-5">
        {navMenus.map((item, i) => (
          <NavContent key={i} item={item} className={""} />
        ))}
      </div>
    </div>
  );
};

export const NavContent = ({ className, item }) => {
  return (
    <NavLink to={item} className={`${className} capitalize hover:text-cyan-600`}>
      {item}
    </NavLink>
  );
};
NavContent.propTypes;
