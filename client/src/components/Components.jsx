import { FaChevronLeft, FaTrash, FaPlus, FaTimes, FaEye, FaExclamationCircle, FaEdit } from "react-icons/fa";
import { PiSpinner } from "react-icons/pi";
import { Link } from "react-router-dom";
import { H2 } from "./Tags";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";

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

export const TimeAgo = ({ time, className }) => {
  let timeAgo = "";
  if (time) {
    const date = parseISO(time);
    const period = formatDistanceToNow(date);
    timeAgo = `${period} ago`;
  }
  return <span className={`${className} text-sm`}>{timeAgo}</span>;
};
TimeAgo.propTypes;

export const Modal = ({ children = "Modal", id, onClick, className }) => {
  const { dark } = useSelector((state) => state.basic);

  return (
    <div
      onClick={onClick}
      className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex items-center justify-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative ${className} ${
          dark ? "bg-slate-800" : "bg-white"
        } p-5 mx-3 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 shadow rounded-lg`}
      >
        <button onClick={onClick} className="hover:text-red-500 absolute right-3 top-3">
          <FaTimes />
        </button>
        <div className="mr-5 text-sm">ID: {id}</div>
        {children}
      </div>
    </div>
  );
};
Modal.propTypes;

export const ConfModalDel = ({ onDelete, onClose, className }) => {
  return (
    <div className={`${className}`}>
      <div className="flex gap-3">
        <form onSubmit={onDelete} className="relative">
          <input type="checkbox" autoFocus className="absolute opacity-0" />
          <button type="submit" className="bg-red-500 text-white p-2 rounded">
            Delete
          </button>
        </form>
        <button className="bg-slate-600 text-white p-2 rounded" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};
ConfModalDel.propTypes;

export const PreviewImg = ({ onRemovePreview, preview }) => {
  return (
    <div className="relative w-48 h-48 my-2 border p-1 rounded overflow-hidden group">
      <button
        onClick={onRemovePreview}
        className="hidden group-hover:flex items-center justify-center bg-[rgba(0,0,0,.5)] p-3 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <FaTrash className="text-red-500 inline-block" />
      </button>
      <img src={preview} width={200} alt="image preview" className="object-contain object-center w-full h-full" />
    </div>
  );
};
PreviewImg.propTypes;

export const Actions = ({ className, modalView, modalDelete, id }) => {
  return (
    <div className={`${className} flex w-full border border-blue-300 rounded-lg justify-around p-2`}>
      <button onClick={modalView} className="text-blue-500 hover:opacity-70">
        <FaEye />
      </button>
      <Link to={`detail/${id}`} className="text-yellow-500 hover:opacity-70">
        <FaExclamationCircle />
      </Link>
      <Link to={`update/${id}`} className="text-green-500 hover:opacity-70">
        <FaEdit />
      </Link>
      <button onClick={modalDelete} className="text-red-500 hover:opacity-70">
        <FaTrash />
      </button>
    </div>
  );
};
Actions.propTypes;
