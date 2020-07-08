import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import callAPi from "../../service/callApi";
import DeleteIcon from "@material-ui/icons/Delete";
import "./style.css";

export default class table extends Component {
  state = {
    scheduling: [],
  };

  fetchData() {
    callAPi.get(`/scheduling`).then((res) => {
      let scheduling = res.data;
      this.setState({ scheduling });
      console.log(scheduling);
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  onDeleteChange(id, name) {
    var res = window.confirm(`Você deseja excluir?`);
    if (res) {
      callAPi.delete(`/scheduling/${id}`).then((res) => {
        console.log(res.data);
      });
      this.fetchData();
    }
  }

  render() {
    return (
      <div>
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Data</TableCell>
                  <TableCell align="Center">Valor Recebido</TableCell>
                  <TableCell align="center">Valor Total</TableCell>
                  <TableCell align="center">Cliente</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.scheduling.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.valueReceive}</TableCell>
                    <TableCell align="center">{row.totalReceived}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>

                    <TableCell align="center">
                      <button onClick={() => this.onDeleteChange(row.id)}>
                        <DeleteIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
