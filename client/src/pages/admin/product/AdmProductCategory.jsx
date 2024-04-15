import { useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  usePostCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../app/api/productCategoryApiSlice";
import { Err, Loading } from "../../../components/Components";
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";
import { H2 } from "../../../components/Tags";

const AdmProductCategory = () => {
  const { data: categories, isLoading, isSuccess, isError, error } = useGetCategoriesQuery();
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(null);

  const [postCategory] = usePostCategoryMutation();

  const handlePostCategory = (e) => {
    e.preventDefault();
    postCategory({ name })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setName("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
  };

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const renderedCategory =
      categories &&
      categories.map((item) => <AdmProductCategoryList key={item?._id} item={item} isEdit={isEdit} setIsEdit={setIsEdit} />);
    content = <div className="w-72">{renderedCategory}</div>;
  }
  return (
    <div>
      <H2 className={"py-2"}>Category List</H2>
      <form onSubmit={handlePostCategory} className="border rounded overflow-hidden flex items-center w-72">
        <input
          type="text"
          placeholder="new category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus:outline-none p-2 w-full"
        />
        <button type="submit" className="border-l w-12 flex self-stretch justify-center items-center">
          <FaPlus />
        </button>
      </form>
      {content}
    </div>
  );
};

export default AdmProductCategory;

const AdmProductCategoryList = ({ item, isEdit, setIsEdit }) => {
  const [deleteCategory, { isLoading: loadDelete }] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [name, setName] = useState(item.name);

  const handleDeleteCategory = (id) => {
    deleteCategory(id)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleUpdateCategory = () => {
    updateCategory({ id: item?._id, name })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setIsEdit(null);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleCancelEdit = () => {
    setIsEdit(null);
    setName(item.name);
  };

  return (
    <div key={item?._id} className="flex justify-between p-2 border-b">
      {isEdit === item?._id ? (
        <input type="text" value={name} autoFocus onChange={(e) => setName(e.target.value)} className="focus:outline-none" />
      ) : (
        <div onClick={() => setIsEdit(item?._id)}>{item?.name}</div>
      )}
      <div className="flex gap-3">
        {isEdit === item?._id ? (
          <>
            <button onClick={handleUpdateCategory}>
              <FaCheck className="text-green-600" />
            </button>
            <button onClick={handleCancelEdit}>
              <FaTimes className="text-red-600" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEdit(item?._id)}>
              <FaEdit className="text-green-600" />
            </button>
            <button onClick={() => handleDeleteCategory(item?._id)}>
              {loadDelete ? <PiSpinner className="animate-spin" /> : <FaTrash className="text-red-600" />}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
AdmProductCategoryList.propTypes;
