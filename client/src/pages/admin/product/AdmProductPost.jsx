import { useState } from "react";
import { Input, Label, Select, Textarea } from "../../../components/Tags";
import { PreviewImg, Title } from "../../../components/Components";
import { usePostProductMutation } from "../../../app/api/productApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useGetCategoriesQuery } from "../../../app/api/productCategoryApiSlice";

const AdmProductPost = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const [postProduct] = usePostProductMutation();
  const { data: categories } = useGetCategoriesQuery();

  const onRemovePreview = () => {
    setImage("");
    setPreview("");
  };

  const handleChangeImage = (e) => {
    const files = e.target.files[0];
    setImage(files);
    setPreview(URL.createObjectURL(files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("image", image);
    formData.append("description", description);
    postProduct(formData)
      .unwrap()
      .then((res) => {
        setName("");
        setPrice("");
        setDescription("");
        toast.success(res.message);
        navigate(-1);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  return (
    <div>
      <Title>Post Product</Title>
      <form onSubmit={handleSubmit}>
        <div className="flex sm:gap-3 flex-col sm:flex-row">
          <div className="flex-1">
            <Label id="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex-1">
            <Label id="price">Price</Label>
            <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
        <div className="flex sm:gap-3 flex-col sm:flex-row">
          <div className="flex-1">
            <Label id="quantity">Quantity</Label>
            <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className="flex-1">
            <Label id="category">Category</Label>
            <Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">select category</option>
              {categories &&
                categories.map((item) => (
                  <option key={item?._id} value={item?._id}>
                    {item.name}
                  </option>
                ))}
            </Select>
          </div>
        </div>
        <Label id="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Label id="image">Image</Label>
        <Input type="file" onChange={handleChangeImage} />
        {preview && <PreviewImg preview={preview} onRemovePreview={onRemovePreview} />}
        <button type="submit" className="border rounded bg-cyan-600 p-2 text-white hover:opacity-70">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdmProductPost;
