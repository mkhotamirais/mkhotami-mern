import { useState } from "react";
import { Title } from "../../../components/Components";
import { Input, InputRef, Label } from "../../../components/Tags";

const AdmUserPost = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  return (
    <div>
      <Title>Post User</Title>
      <form>
        <Label id="username">username</Label>
        <InputRef id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Label id="email">email</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div>
          <Label id="password">password</Label>
          <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Label id="confPassword">confirm password</Label>
          <Input type="password" id="confPassword" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
        </div>
        <Label id="gender">gender</Label>
        <Input id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
        <Label id="role">role</Label>
        <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
      </form>
    </div>
  );
};

export default AdmUserPost;
