import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import callApi from "../../service/callApi";

export default function ResponsiveDialog() {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirm = async () => {
    console.log(newUser);

    await callApi.post(`/user`, newUser).then((res) => {
      if (res.status === 200) {
        alert("Usuário Cadastrado com Sucesso");
        setOpen(false);
      }
    });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Cadastrar Novo
      </Button>
      <Dialog
        fullScreens
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Usuário"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Nome"
              multiline
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <br />
            <TextField
              label="CPF"
              multiline
              onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
            />
            <br />
            <TextField
              label="Telefone"
              multiline
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />
            <br />
            <TextField
              label="email"
              multiline
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <br />
            <TextField
              label="Foto de Perfil"
              multiline
              onChange={(e) =>
                setNewUser({ ...newUser, imageProfile: e.target.value })
              }
            />
            <br />
            <TextField
              label="Senha"
              type="password"
              multiline
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <br />
            <TextField
              label="Status"
              multiline
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
            />
            <br />
            <TextField
              label="Perfil"
              multiline
              onChange={(e) =>
                setNewUser({ ...newUser, profile: e.target.value })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secundary">
            Cancelar
          </Button>
          <Button onClick={confirm} color="primary" autoFocus>
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
