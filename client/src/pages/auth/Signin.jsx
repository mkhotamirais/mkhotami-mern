import { Input, InputRef, Label } from "../../components/Tags";
import { useEffect, useRef, useState } from "react";
import AuthLayout from "./AuthLayout";
import { useSigninMutation } from "../../app/api/authApiSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../../app/features/authSlice";
import { useNavigate } from "react-router";
import { removeOpenNavUser } from "../../app/features/basicSlice";

const Signin = () => {
  const usernameRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const [login, { isLoading }] = useSigninMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password })
      .unwrap()
      .then((res) => {
        dispatch(setUserData(res.data));
        navigate("/");
        dispatch(removeOpenNavUser());
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  return (
    <AuthLayout title="login" onSubmit={handleSubmit} isLoading={isLoading}>
      <Label>Username</Label>
      <InputRef ref={usernameRef} placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Label>Password</Label>
      <Input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
    </AuthLayout>
  );
};

export default Signin;
