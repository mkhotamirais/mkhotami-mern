import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { H1 } from "../../components/Tags";
import { useSelector } from "react-redux";

const AuthLayout = ({ children, title, onSubmit, isLoading }) => {
  const { dark } = useSelector((state) => state.basic);

  return (
    <div
      className={`${
        dark ? "bg-slate-700" : "bg-slate-100"
      } z-50 fixed top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center`}
    >
      <div
        className={`${
          dark ? "bg-slate-800 text-white" : "bg-white text-gray-700"
        } border rounded-lg p-5 mx-3 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 shadow`}
      >
        <div className="flex items-center gap-3">
          <Link to={-1}>
            <FaArrowLeft />
          </Link>
          <H1>{title}</H1>
        </div>
        <form onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="border rounded flex justify-center p-2 w-full bg-cyan-700 text-white hover:opacity-70"
          >
            {isLoading ? <FaSpinner className="text-2xl p-1 animate-spin" /> : title === "login" ? "login" : "register"}
          </button>
        </form>{" "}
        {title === "login" && (
          <p className="py-3">
            Do not have an account?{" "}
            <Link className="text-cyan-600" to="/signup">
              register
            </Link>
          </p>
        )}
        {title === "register" && (
          <p className="py-3">
            Already have an account?{" "}
            <Link className="text-cyan-600" to="/signin">
              login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};
AuthLayout.propTypes;

export default AuthLayout;
