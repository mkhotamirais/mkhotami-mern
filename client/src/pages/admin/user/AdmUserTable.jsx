import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { TimeAgo } from "../../../components/Components";
import { useState } from "react";
import AdmUserModalDetail from "./AdmUserModalDetail";
import AdmUserModalDelete from "./AdmUserModalDelete";
import { Link } from "react-router-dom";

const AdmUserTable = ({ item, i }) => {
  const [showUserModalDetail, setShowUserModalDetail] = useState(null);
  const [showUserModalDelete, setShowUserModalDelete] = useState(null);

  const onClose = () => {
    if (showUserModalDelete !== null) setShowUserModalDelete(null);
    if (showUserModalDetail !== null) setShowUserModalDetail(null);
  };
  return (
    <tr className="*:border *:text-left *:p-1 *:px-2 *:rounded">
      <td>{i + 1}</td>
      <td>{item?.username}</td>
      <td className="hidden sm:table-cell">{item?.email}</td>
      <td className="hidden sm:table-cell">{item?.role}</td>
      <td className="hidden md:table-cell">{item?.gender || "-"}</td>
      <td className="hidden lg:table-cell">
        <TimeAgo time={item?.createdAt} />
      </td>
      <td className="hidden xl:table-cell">
        <TimeAgo time={item?.updatedAt} />
      </td>
      <td>
        <div className="flex justify-between">
          <button onClick={() => setShowUserModalDetail(item?._id)}>
            <FaEye className="text-yellow-600" />
          </button>
          <Link to={`update/${item?._id}`}>
            <FaEdit className="text-green-600" />
          </Link>
          <button onClick={() => setShowUserModalDelete(item?._id)}>
            <FaTrash className="text-red-600" />
          </button>
        </div>
        {showUserModalDetail === item?._id && <AdmUserModalDetail item={item} onClose={onClose} />}
        {showUserModalDelete === item?._id && <AdmUserModalDelete item={item} onClose={onClose} />}
      </td>
    </tr>
  );
};
AdmUserTable.propTypes;

export default AdmUserTable;
