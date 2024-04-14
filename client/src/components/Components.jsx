import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { PiSpinner } from "react-icons/pi";
import { Link } from "react-router-dom";
import { H2 } from "./Tags";

export const Logo = ({ className }) => {
  return (
    <div className={`${className} flex flex-col`}>
      <div className="text-xl capitalize leading-none">mkhotami</div>
      <div>mern</div>
    </div>
  );
};
Logo.propTypes;

export const Loading = ({ className }) => (
  <div className={`${className} flex justify-center py-8`}>
    <PiSpinner className="animate-spin text-3xl" />
  </div>
);
Loading.propTypes;

export const Err = ({ children = "Err", className }) => (
  <div className={`${className} flex justify-center py-8 italic text-red-600`}>{children}</div>
);
Err.propTypes;

export const PostBtn = ({ className }) => {
  return (
    <Link to="post" className={`${className} bg-cyan-600 p-2 text-sm text-white rounded-full hover:opacity-70`}>
      <FaPlus />
    </Link>
  );
};
PostBtn.propTypes;

export const Title = ({ children = "Title", className }) => (
  <div className={`${className} w-fit py-2 flex items-center gap-2`}>
    <Prev />
    <H2>{children}</H2>
  </div>
);
Title.propTypes;

export const Prev = ({ className }) => (
  <div className={`${className}`}>
    <Link to={-1} className="hover:text-cyan-600">
      <FaChevronLeft />
    </Link>
  </div>
);
Prev.propTypes;
