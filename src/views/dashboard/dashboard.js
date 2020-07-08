/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import callApi from "../../service/callApi";

// import { Container } from './styles';

function dashboard(props) {
  const [user, setUser] = useState({});
  const id = props.match.params.id;

  callApi.get(`/user/${id}`).then((res) => {
    setUser(res.data[0]);
  });

  return (
    <div>
      <div className="perfil">
        <img src={user.imageProfile} alt="Perfil" className="imgProf" />
        <strong>Nome</strong>
        <span>{user.name}</span>
      </div>
    </div>
  );
}

export default dashboard;
