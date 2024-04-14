import { useSelector } from "react-redux";
import { NavAuth, NavDark, NavSourceCode } from "./NavRight";
import { Logo } from "./Components";
import { NavBtn, NavMain } from "./NavCenter";

const Header = () => {
  const { dark } = useSelector((state) => state.basic);

  return (
    <header className={`${dark ? "bg-slate-800" : "bg-white"} z-50 sticky top-0 h-16 border-b px-3 lg:px-16`}>
      <div className="h-full flex gap-3 items-center justify-between">
        <div className="flex gap-4">
          <NavBtn />
          <Logo />
        </div>
        <div className="w-full">
          <NavMain />
        </div>
        <div className="flex items-center gap-3 text-xl">
          <NavDark />
          <NavSourceCode />
          <NavAuth />
        </div>
      </div>
    </header>
  );
};

export default Header;
