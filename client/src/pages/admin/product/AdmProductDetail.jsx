import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../../../app/api/productApiSlice";
import { TimeAgo, Title } from "../../../components/Components";

const AdmProductDetail = () => {
  const { id } = useParams();
  const { data: item } = useGetProductByIdQuery(id);

  return (
    <div>
      <Title>Detail {item?.name}</Title>
      <div className="bg-gray-100 p-2 rounded w-full">
        <figure className="size-64 w-full">
          <img src={item?.imageUrl} alt={item?.imageName} className="w-full h-full object-contain object-center" />
        </figure>
      </div>
      <div>{item?.name}</div>
      <div>{item?.price?.toLocaleString("id-ID")}</div>
      <div>{item?.category?.name}</div>
      <div>{item?.quantity}</div>
      <div>{item?.description}</div>
      <div className="flex flex-col text-sm">
        <TimeAgo time={item?.createdAt} />
        <TimeAgo time={item?.updatedAt} />
      </div>
    </div>
  );
};

export default AdmProductDetail;
