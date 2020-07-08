import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import callApi from "../../service/callApi";
// import { Container } from './styles';

function login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const user = {
      email,
      password,
    };

    await callApi.post(`/auth`, user).then((res) => {
      console.log(res);
      if (res.data[0] == null) {
        alert("Usuario e senha incorretos");
      } else {
        const id = res.data[0].id;
        window.location.href = `http://localhost:3000/index/${id}`;
      }
    });
  };

  return (
    <div>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>ENTRAR</Button>
    </div>
  );
}

export default login;
