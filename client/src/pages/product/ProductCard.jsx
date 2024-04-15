import { useState } from "react";
import { TimeAgo } from "../../components/Components";
import ProductModalView from "./ProductModalView";
import { FaCartPlus, FaExclamationCircle, FaEye } from "react-icons/fa";
import { Button } from "../../components/Tags";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const [showModalView, setShowModalView] = useState(null);

  const onClose = () => {
    if (showModalView) setShowModalView(null);
  };

  return (
    <div className="border rounded p-2 flex flex-col">
      <div className="text-sm text-gray-500">ID:{item?._id?.substring(0, 7)}..</div>
      <div className="bg-gray-100 p-2 rounded">
        <figure className="size-32 w-full">
          <img src={item?.imageUrl} alt={item?.imageName} className="w-full h-full object-contain object-center" />
        </figure>
      </div>
      <div>{item?.name}</div>
      <div>{item?.price}</div>
      <div>
        <div className="flex flex-col text-sm">
          <TimeAgo time={item?.createdAt} />
          <TimeAgo time={item?.updatedAt} />
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex gap-2 sm:gap-4">
          <Button onClick={() => setShowModalView(item?._id)}>
            <FaEye className="text-yellow-600" />
          </Button>
          <Link to={`detail/${item?._id}`}>
            <Button>
              <FaExclamationCircle className="text-green-600" />
            </Button>
          </Link>
        </div>
        <div>
          <Button>
            <FaCartPlus className="text-blue-500" />
          </Button>
        </div>
      </div>
      {showModalView === item?._id && <ProductModalView onClose={onClose} item={item} />}
    </div>
  );
};
ProductCard.propTypes;

export default ProductCard;
