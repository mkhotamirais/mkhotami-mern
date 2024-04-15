import { useState } from "react";
import { H2, Input, InputRef, Label } from "../../../components/Tags";
import { PreviewImg } from "../../../components/Components";

const AdmProductPost = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const onRemovePreview = () => {
    setImage("");
    setPreview("");
  };

  const handleChangeProduct = (e) => {
    const files = e.target.files[0];
    setImage(files);
    setPreview(URL.createObjectURL(files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <H2>Post Product</H2>
      <form onSubmit={handleSubmit}>
        <div className="flex sm:gap-3 flex-col sm:flex-row">
          <div className="flex-1">
            <Label id="name">Name</Label>
            <InputRef autoFocus={true} id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex-1">
            <Label id="price">Price</Label>
            <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
        <PreviewImg preview={preview} onRemovePreview={onRemovePreview} />
        <button type="submit" className="border rounded bg-cyan-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdmProductPost;
