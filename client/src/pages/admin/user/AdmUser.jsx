import { useEffect } from "react";
import { useGetUsersQuery } from "../../../app/api/userApiSlice";
import { Err, Loading, PostBtn } from "../../../components/Components";
import AdmUserTable from "./AdmUserTable";

const AdmUser = () => {
  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();
  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    const renderedUser = users && users.map((item, i) => <AdmUserTable key={item?._id} item={item} i={i} />);
    content = (
      <table className="w-full border-separate border-spacing-1">
        <thead>
          <tr className="*:border *:text-left *:p-1 *:px-2 *:rounded">
            <th>no</th>
            <th>username</th>
            <th>email</th>
            <th>role</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{renderedUser}</tbody>
      </table>
    );
  }

  return (
    <div>
      <div className="py-3 flex justify-between">
        <div>halo</div>
        <PostBtn />
      </div>
      {content}
    </div>
  );
};

export default AdmUser;
