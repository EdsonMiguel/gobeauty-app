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
  const [newService, setNewService] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirm = async () => {
    console.log(newService);

    await callApi.post(`/service`, newService).then((res) => {
      if (res.status === 200) {
        alert("Serviço cadastrado com sucesso");
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
              label="Descrição"
              multiline
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
            />
            <br />
            <TextField
              label="Valor"
              multiline
              onChange={(e) =>
                setNewService({ ...newService, value: e.target.value })
              }
            />
            <br />
            <TextField
              label="Status"
              multiline
              onChange={(e) =>
                setNewService({ ...newService, status: e.target.value })
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
