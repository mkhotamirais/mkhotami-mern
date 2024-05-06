import { Actions } from "../../../components/Components";
import { useState } from "react";
import AdmUserModalView from "./AdmUserModalView";
import AdmUserModalDelete from "./AdmUserModalDelete";
import moment from "moment";

const AdmUserTable = ({ item, i }) => {
  const [showModalView, setShowModalView] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(null);

  const onClose = () => {
    if (showModalDelete !== null) setShowModalDelete(null);
    if (showModalView !== null) setShowModalView(null);
  };
  return (
    <tr className="*:border *:text-left *:p-1 *:px-2 *:rounded">
      <td>{i + 1}</td>
      <td>{item?.username}</td>
      <td className="hidden sm:table-cell">{item?.email}</td>
      <td className="hidden sm:table-cell">{item?.role}</td>
      <td className="hidden md:table-cell">{item?.gender || "-"}</td>
      <td className="hidden lg:table-cell">{moment(item?.createdAt).fromNow()}</td>
      <td className="hidden xl:table-cell">{moment(item?.updatedAt).fromNow()}</td>
      <td>
        <Actions
          modalView={() => setShowModalView(item?._id)}
          modalDelete={() => setShowModalDelete(item?._id)}
          id={item?._id}
          className={"border-none"}
        />
        {showModalView === item?._id && <AdmUserModalView item={item} onClose={onClose} />}
        {showModalDelete === item?._id && <AdmUserModalDelete item={item} onClose={onClose} />}
      </td>
    </tr>
  );
};
AdmUserTable.propTypes;

export default AdmUserTable;
