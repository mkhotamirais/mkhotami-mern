import { useDeleteProductMutation } from "../../../app/api/productApiSlice";
import toast from "react-hot-toast";
import { ConfModalDel, Modal } from "../../../components/Components";

const AdmProductModalDelete = ({ item, onClose }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const onDelete = (e) => {
    e.preventDefault();
    deleteProduct(item?._id)
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
AdmProductModalDelete.propTypes;

export default AdmProductModalDelete;
