import { useSelector } from "react-redux";
import { Modal } from "../../../components/Components";

const AdmUserModalDetail = ({ item, onClose }) => {
  const { dark } = useSelector((state) => state.basic);
  return (
    <Modal className={dark ? "bg-slate-800" : "bg-white"} onClick={onClose} id={item?._id}>
      <div className="flex gap-2 flex-col my-5">
        <div>username: {item?.username}</div>
        <div>email: {item?.email}</div>
        <div>role: {item?.role}</div>
        <div>gender: {item?.gender || "-"}</div>
        <div>createdAt: {item?.createdAt}</div>
        <div>updatedAt: {item?.updatedAt}</div>
      </div>
    </Modal>
  );
};
AdmUserModalDetail.propTypes;

export default AdmUserModalDetail;
