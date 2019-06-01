import React, { Component } from "react";
import Grid from "../components/grid";

import PageHeader from "../components/pageheader";
import JazzApi from "../Services/JazzApi";

const URL = "http://localhost:3003/api/itens";

const initialState = {
  item: {
    name: "",
    description: "",
    priceDebit: "",
    priceCash: "",
    type: ""
  },
  list: []
};

export default class Menu extends Component {
  state = { ...initialState };

  componentDidMount() {
    JazzApi.getMenuItens().then(resp => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ item: initialState.item });
  }

  save() {
    const item = this.state.item;
    const method = item._id ? "put" : "post";

    if (method === "post") {
      JazzApi.createMenuItem(item).then(resp => {
        const list = this.getUpdateList(resp.data);
        this.setState({ item: initialState.item, list });
      });
    } else {
      JazzApi.updateMenuItem(item).then(resp => {
        const list = this.getUpdateList(resp.data);
        this.setState({ item: initialState.item, list });
      });
    }
  }

  load(item) {
    this.setState({ item });
  }

  remove(item) {
    JazzApi.removeMenuItem(item._id).then(resp => {
      const list = this.getUpdateList(item, false);
      this.setState({ list });
    });
  }

  getUpdateList(item, add = true) {
    const list = this.state.list.filter(i => i._id !== item._id);
    if (add) list.unshift(item);
    return list;
  }

  updateField(event) {
    const item = { ...this.state.item };
    item[event.target.name] = event.target.value;
    this.setState({ item });
  }

  print() {
    console.log(this.state.item);
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor em dinheiro</th>
            <th>Valor em débito</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map(item => {
      return (
        <tr key={item._id}>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>R$ {item.priceCash}</td>
          <td>R$ {item.priceDebit}</td>
          <td>{item.type}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(item)}>
              <i className="fa fa-pencil" />
            </button>
            <label> -- </label>
            <button
              className="btn btn-danger ml-5"
              onClick={() => this.remove(item)}
            >
              <i className="fa fa-trash" />
            </button>
          </td>
        </tr>
      );
    });
  }

  renderForm() {
    return (
      <div role="form" className="itemForm">
        <Grid cols="12 9 10">
          <h4>Nome do produto</h4>
          <input
            id="name"
            name="name"
            value={this.state.item.name}
            onChange={e => this.updateField(e)}
            type="text"
            placeholder="Nome do produto"
            className="form-control"
          />

          <h4>Descrição</h4>
          <input
            id="description"
            name="description"
            onChange={e => this.updateField(e)}
            value={this.state.item.description}
            type="text"
            placeholder="Descrição do produto"
            className="form-control"
          />

          <h4>Valor em dinheiro</h4>
          <input
            id="priceCash"
            name="priceCash"
            onChange={e => this.updateField(e)}
            value={this.state.item.priceCash}
            type="number"
            placeholder="Valor em dinheiro"
            className="form-control"
          />

          <h4>Valor em débito</h4>
          <input
            id="priceDebit"
            name="priceDebit"
            onChange={e => this.updateField(e)}
            value={this.state.item.priceDebit}
            type="number"
            placeholder="Valor em débito"
            className="form-control"
          />
        </Grid>

        <Grid cols="12 9 10">
          <h4>Selecione o tipo:</h4>
          <select
            className="form-control"
            name="type"
            onChange={e => this.updateField(e)}
          >
            <option value="" />
            <option value="COMIDA">COMIDA</option>
            <option value="BEBIDA">BEBIDA</option>
          </select>
        </Grid>

        <Grid cols="12 9 10">
          <br />
          <button className="btn btn-primary" onClick={e => this.save(e)}>
            <i className="fa fa-plus"> ADICIONAR PRODUTO</i>
          </button>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div>
        <PageHeader name="Cardápio" small="Cadastro" />
        {this.renderForm()}
        <PageHeader name="Cardápio" small="Lista" />
        {this.renderTable()}
      </div>
    );
  }
}
