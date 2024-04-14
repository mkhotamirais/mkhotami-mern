import { Input, InputRef, Label } from "../../components/Tags";
import { useEffect, useRef, useState } from "react";
import AuthLayout from "./AuthLayout";
import { useSignupMutation } from "../../app/api/authApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Signup = () => {
  const usernameRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const [register, { isLoading }] = useSignupMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ username, email, password, confPassword })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/signin");
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  return (
    <AuthLayout title="register" onSubmit={handleSubmit} isLoading={isLoading}>
      <Label>Username</Label>
      <InputRef ref={usernameRef} placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Label>Email</Label>
      <Input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Label>Password</Label>
      <Input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Label>Confirm Password</Label>
      <Input type="password" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
    </AuthLayout>
  );
};

export default Signup;
