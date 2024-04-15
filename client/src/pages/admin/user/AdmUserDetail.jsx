import { useParams } from "react-router";
import { useGetUserByIdQuery } from "../../../app/api/userApiSlice";
import { Title } from "../../../components/Components";

const AdmUserDetail = () => {
  const { id } = useParams();
  const { data: item } = useGetUserByIdQuery(id);

  return (
    <div>
      <Title>Detail {item?.username}</Title>
      <div className="flex gap-2 flex-col my-5">
        <div>username: {item?.username}</div>
        <div>email: {item?.email}</div>
        <div>role: {item?.role}</div>
        <div>gender: {item?.gender || "-"}</div>
        <div>createdAt: {item?.createdAt}</div>
        <div>updatedAt: {item?.updatedAt}</div>
      </div>
    </div>
  );
};

export default AdmUserDetail;
