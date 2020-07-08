import React, { Component } from "react";
import Table from "./table";
import Dialog from "./dialog";

export default class index extends Component {
  render() {
    return (
      <div>
        <Dialog />
        <Table />
      </div>
    );
  }
}
