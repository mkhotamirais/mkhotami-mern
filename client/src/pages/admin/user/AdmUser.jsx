import { useGetUsersQuery } from "../../../app/api/userApiSlice";
import { Err, Loading, PostBtn } from "../../../components/Components";
import { H2 } from "../../../components/Tags";
import AdmUserTable from "./AdmUserTable";

const AdmUser = () => {
  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

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
            <th className="hidden sm:table-cell">email</th>
            <th className="hidden sm:table-cell">role</th>
            <th className="hidden md:table-cell">gender</th>
            <th className="hidden lg:table-cell">created</th>
            <th className="hidden xl:table-cell">updated</th>
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
        <H2>User List</H2>
        <PostBtn />
      </div>
      {content}
    </div>
  );
};

export default AdmUser;
