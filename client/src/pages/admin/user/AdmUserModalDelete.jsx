import { ConfModalDel, Modal } from "../../../components/Components";
import { useDeleteUserMutation } from "../../../app/api/userApiSlice";
import toast from "react-hot-toast";

const AdmUserModalDelete = ({ item, onClose }) => {
  const [deleteUser] = useDeleteUserMutation();
  const onDelete = (e) => {
    e.preventDefault();
    deleteUser(item?._id)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
    onClose();
  };
  return (
    <Modal onClick={onClose} id={item?._id}>
      <div className="flex gap-2 flex-col mt-5">
        <div>Delete {item?.username}, apakah kamu yakin?</div>
        <ConfModalDel onDelete={onDelete} onClose={onClose} />
      </div>
    </Modal>
  );
};
AdmUserModalDelete.propTypes;

export default AdmUserModalDelete;
