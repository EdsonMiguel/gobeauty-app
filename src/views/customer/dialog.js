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
  const [newCustomer, setNewCustomer] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirm = async () => {
    console.log(newCustomer);

    await callApi.post(`/customer`, newCustomer).then((res) => {
      if (res.status === 200) {
        alert("Cliente cadastrado com sucesso!!");
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
        <DialogTitle id="responsive-dialog-title">{"Cliente"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Nome"
              multiline
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
            />
            <br />
            <TextField
              label="Email"
              multiline
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
            />
            <br />
            <TextField
              label="Telefone"
              multiline
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
            />

            <br />
            <TextField
              label="Status"
              multiline
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, status: e.target.value })
              }
            />
            <br />
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
