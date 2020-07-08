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
    customer: [],
  };

  fetchData() {
    callAPi.get(`/customer`).then((res) => {
      let customer = res.data;
      this.setState({ customer });
      console.log(customer);
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  onDeleteChange(id, name) {
    var res = window.confirm(`Você deseja excluir: ${name}?`);
    if (res) {
      callAPi.delete(`/customer/${id}`).then((res) => {
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
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="Center">Email</TableCell>
                  <TableCell align="center">Telefone</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.customer.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                      <button
                        onClick={() => this.onDeleteChange(row.id, row.name)}
                      >
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
