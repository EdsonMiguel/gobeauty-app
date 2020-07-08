import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import callApi from "../../service/callApi";

export default function ResponsiveDialog() {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [newScheduling, setNewScheduling] = useState({});

  const handleClickOpen = () => {
    fetchCustomerList();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirm = async () => {
    await callApi.post(`/scheduling`, newScheduling).then((res) => {
      if (res.status === 200) {
        alert("Usuário Cadastrado com Sucesso");
        setOpen(false);
      }
    });
  };
  const handleSelectChange = (event) => {
    setCustomer(event.target.value);
    setNewScheduling({
      ...newScheduling,
      customerId: `${event.target.value}`,
    });
  };

  const fetchCustomerList = () => {
    callApi.get(`/customer`).then((res) => setCustomerList(res.data));
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
              label="Data"
              multiline
              onChange={(e) =>
                setNewScheduling({ ...newScheduling, date: e.target.value })
              }
            />
            <br />
            <TextField
              label="Valor Recebido"
              multiline
              onChange={(e) =>
                setNewScheduling({
                  ...newScheduling,
                  valueReceive: e.target.value,
                })
              }
            />
            <br />
            <TextField
              label="Total Received"
              multiline
              onChange={(e) =>
                setNewScheduling({
                  ...newScheduling,
                  totalReceived: e.target.value,
                })
              }
            />
            <br />
            <TextField
              label="Valor alterado"
              multiline
              onChange={(e) =>
                setNewScheduling({
                  ...newScheduling,
                  valueChange: e.target.value,
                })
              }
            />
            <br />
            <TextField
              label="Status"
              multiline
              onChange={(e) =>
                setNewScheduling({
                  ...newScheduling,
                  status: e.target.value,
                })
              }
            />
            <br />
            <FormControl>
              <InputLabel id="demo-simple-select-label">Clientes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={customer}
                onChange={handleSelectChange}
              >
                {customerList.map((i) => (
                  <MenuItem value={i.id}>{i.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
