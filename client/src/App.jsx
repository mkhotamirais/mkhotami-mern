import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { removeOpenNav, removeOpenNavUser } from "./app/features/basicSlice";
import { NavCollapse } from "./components/NavCenter";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { dark, openNav, openNavUser } = useSelector((state) => state.basic);
  const dispatch = useDispatch();

  const handleClickMain = () => {
    if (openNavUser) dispatch(removeOpenNavUser());
    if (openNav) dispatch(removeOpenNav());
  };

  return (
    <div className={`${dark ? "bg-slate-800 text-white" : ""}`}>
      <Header />
      <NavCollapse />
      <main onClick={handleClickMain} className="min-h-screen px-3 lg:px-16">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
      <Toaster />
    </div>
  );
};

export default App;
