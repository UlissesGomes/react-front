import React, { Component } from "react";

import PageHeader from "../components/pageheader";

import JazzService from "../Services/JazzApi";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      orders: [],
      isLoading: true,
      isError: false
    };
  }

  componentDidMount() {
    JazzService.getOrders()
      .then(resp => {
        this.setState({
          orders: resp.data,
          isLoading: false,
          isError: false
        });
      })
      .catch(err => {
        this.setState({
          isError: true
        });
      });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Número do pedido</th>
            <th>Data</th>
            <th>Itens</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderItens(itens) {
    return itens.map(item => {
      return (
        <table>
          <tbody>
            <tr>
              <td>Nome: {item.name}</td>
              <td>Quantidade: {item.qtd}</td>
            </tr>
          </tbody>
        </table>
      );
    });
  }

  renderRows() {
    const { orders } = this.state;

    return orders.map(order => (
      <tr key={order._id}>
        <td>{order.numberOrder}</td>
        <td>{order.date}</td>
        <td>{this.renderItens(order.itens)}</td>
      </tr>
    ));
  }

  render() {
    const { isLoading, isError } = this.state;

    return (
      <div>
        <PageHeader name="Pedidos" small="orders" />
        {isError ? (
          <h3>Ocorreu um erro :c</h3>
        ) : isLoading ? (
          <h3>Carregando...</h3>
        ) : (
          this.renderTable()
        )}
      </div>
    );
  }
}

export default Orders;
