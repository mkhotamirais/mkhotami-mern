// import { Input, Label } from "../../components/Tags";
// import { useState } from "react";
// import AuthLayout from "./AuthLayout";
// import { useSigninMutation } from "../../app/api/authApiSlice";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
// import { removeOpenNavUser } from "../../app/features/basicSlice";

// const Signin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [login, { isLoading }] = useSigninMutation();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login({ username, password })
//       .unwrap()
//       .then((res) => {
//         navigate("/");
//         dispatch(removeOpenNavUser());
//         toast.success(res.message);
//       })
//       .catch((err) => {
//         toast.error(err.data.message);
//       });
//   };

//   return (
//     <AuthLayout title="login" onSubmit={handleSubmit} isLoading={isLoading}>
//       <Label>Username</Label>
//       <Input placeholder="username" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
//       <Label>Password</Label>
//       <Input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
//     </AuthLayout>
//   );
// };

// export default Signin;

// dari huxnwebdev
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect");

  useEffect(() => {
    console.log(sp);
    console.log("halo");
  }, [redirect]);

  return <div>login</div>;
};

export default Login;
