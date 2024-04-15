import { useEffect, useRef, useState } from "react";
import { Title } from "../../../components/Components";
import { Select, Input, InputRef, Label } from "../../../components/Tags";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../../app/api/userApiSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const AdmUserUpdate = () => {
  const { id } = useParams();
  const { data: user } = useGetUserByIdQuery(id);
  const usernameRef = useRef();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [role, setRole] = useState("user");
  const [gender, setGender] = useState(null);
  const [isEditPass, setIsEditPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const [updateUser] = useUpdateUserMutation();
  useEffect(() => {
    if (user) {
      setUsername(user?.username);
      setEmail(user?.email);
      setGender(user?.gender);
      setRole(user?.role);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { id, username, email, role, gender };
    if (password) data = { ...data, password, confPassword };
    updateUser(data)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate(-1);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  return (
    <div>
      <Title>Update User</Title>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:gap-3 md:flex-row">
          <div className="flex-1">
            <Label id="username">username</Label>
            <InputRef ref={usernameRef} id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="flex-1">
            <Label id="email">email</Label>
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <button type="button" onClick={() => setIsEditPass((prev) => !prev)} className="underline">
          {isEditPass ? "Hide Input" : "Change"} Password
        </button>
        {isEditPass && (
          <div className="flex flex-col md:gap-3 md:flex-row">
            <div className="flex-1">
              <Label id="password">password</Label>
              <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex-1">
              <Label id="confPassword">confirm password</Label>
              <Input
                type="password"
                id="confPassword"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col md:gap-3 md:flex-row">
          <div className="flex-1">
            <Label id="gender">gender</Label>
            <Select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value={null}>select gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </Select>
          </div>
          <div className="flex-1">
            <Label id="role">role</Label>
            <Select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value={null}>select role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </Select>
          </div>
        </div>
        <button type="submit" className="border rounded p-2 bg-cyan-600 text-white hover:opacity-70 my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdmUserUpdate;
