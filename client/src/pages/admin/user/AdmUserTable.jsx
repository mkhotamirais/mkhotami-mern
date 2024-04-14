import { FaEdit, FaTrash } from "react-icons/fa";

const AdmUserTable = ({ item, i }) => {
  return (
    <tr className="*:border *:text-left *:p-1 *:px-2 *:rounded">
      <td>{i + 1}</td>
      <td>{item?.username}</td>
      <td>{item?.email}</td>
      <td>{item?.role}</td>
      <td>
        <button>
          <FaEdit />
        </button>
        <button>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};
AdmUserTable.propTypes;

export default AdmUserTable;
