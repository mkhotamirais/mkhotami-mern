import { FaSun, FaMoon, FaGithub, FaUser, FaCartPlus, FaBlog, FaFilm, FaUserCog } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { FaRightFromBracket, FaRightToBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeOpenNavUser, toggleDark, toggleOpenNavUser } from "../app/features/basicSlice";
import { Link } from "react-router-dom";
import { useGetMeQuery, useSignoutMutation } from "../app/api/authApiSlice";
import toast from "react-hot-toast";

export const NavDark = () => {
  const dispatch = useDispatch();
  const { dark } = useSelector((state) => state.basic);

  return (
    <button onClick={() => dispatch(toggleDark())} className="w-5 h-5 overflow-hidden">
      <FaMoon className={`${dark ? "-translate-y-full" : "translate-y-0"} transition-all duration-150`} />
      <FaSun className={`${dark ? "-translate-y-full" : "translate-y-0"} transition-all duration-150`} />
    </button>
  );
};

export const NavSourceCode = () => {
  return (
    <a href="">
      <FaGithub />
    </a>
  );
};

export const NavAuth = () => {
  const { data: me } = useGetMeQuery();

  if (me?.role === "user") {
    return <NavAuthUser />;
  } else if (me?.role === "admin") {
    return <NavAuthAdmin />;
  } else if (!me?.role) {
    return (
      <Link to="/signin">
        <FaRightToBracket />
      </Link>
    );
  }
};

export const NavAuthUser = () => {
  const { dark, openNavUser } = useSelector((state) => state.basic);
  const dispatch = useDispatch();

  return (
    <div className="relative flex">
      <button onClick={() => dispatch(toggleOpenNavUser())}>
        <FaUser />
      </button>
      {openNavUser && (
        <div
          className={`z-50 ${
            dark ? "bg-slate-800" : "bg-white"
          } shadow text-sm absolute border rounded-lg p-2 right-0 top-full translate-y-2`}
        >
          <div className="flex flex-col gap-1 min-w-max">
            <BtnAuth>
              <FaUser /> <span>My Profile</span>
            </BtnAuth>
            <BtnLogout />
          </div>
        </div>
      )}
    </div>
  );
};

export const NavAuthAdmin = () => {
  const { dark, openNavUser } = useSelector((state) => state.basic);
  const dispatch = useDispatch();

  const menus = [
    { to: "adm-product", icon: <FaCartPlus />, text: "product" },
    { to: "adm-blog", icon: <FaBlog />, text: "blog" },
    { to: "adm-movie", icon: <FaFilm />, text: "movie" },
    { to: "adm-users", icon: <FaUserCog />, text: "user" },
  ];

  return (
    <div className="relative flex">
      <button onClick={() => dispatch(toggleOpenNavUser())}>
        <FaUserShield />
      </button>
      {openNavUser && (
        <div
          className={`z-50 ${
            dark ? "bg-slate-800" : "bg-white"
          } shadow text-sm absolute border rounded-lg p-2 right-0 top-full translate-y-2`}
        >
          <div className="flex flex-col gap-1 min-w-max">
            {menus.map((item, i) => (
              <Link key={i} to={item.to}>
                <BtnAuth onClick={() => dispatch(removeOpenNavUser())}>
                  {item.icon} <span>{item.text}</span>
                </BtnAuth>
              </Link>
            ))}
            <BtnLogout />
          </div>
        </div>
      )}
    </div>
  );
};

const BtnAuth = ({ children, onClick, className }) => {
  const { dark } = useSelector((state) => state.basic);
  return (
    <button
      onClick={onClick}
      className={`${className} flex gap-1 items-center p-2 rounded-md ${dark ? "hover:bg-slate-600" : "hover:bg-slate-100"}`}
    >
      {children}
    </button>
  );
};
BtnAuth.propTypes;

const BtnLogout = () => {
  const [logout] = useSignoutMutation();
  const { dark } = useSelector((state) => state.basic);

  const handleLogout = () => {
    logout()
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.success(err.data.message);
      });
  };

  return (
    <BtnAuth onClick={handleLogout} className={`border ${dark ? "bg-slate-600" : "bg-slate-200"}`}>
      <FaRightFromBracket /> <span>Logout</span>
    </BtnAuth>
  );
};
