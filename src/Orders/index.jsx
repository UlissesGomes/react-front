import React, { Component } from "react";

import PageHeader from "../components/pageheader";
import { CashierConsumer } from "../context/CashierContext";
import JazzService from "../Services/JazzApi";
import JazzApi from "../Services/JazzApi";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%"
  }
};

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      searchPaids: "",
      startDate: new Date(),
      orders: [],
      paidOrders: [],
      searchedOrders: [],
      searchedPaidOrders: [],
      isLoading: true,
      isError: false,
      modalOrder: null,
      isModalOpen: false
    };
  }

  componentDidMount() {
    JazzService.getOrders()
      .then(resp => {
        this.setState({
          orders: resp.data,
          searchedOrders: resp.data,
          isLoading: false,
          isError: false
        });
      })
      .catch(err => {
        this.setState({
          isError: true
        });
      });

    JazzService.getOrdersByValueTrue()
      .then(resp => {
        this.setState({
          paidOrders: resp.data,
          searchedPaidOrders: resp.data,
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
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderPaidTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Número do pedido</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{this.renderPaidRows()}</tbody>
      </table>
    );
  }

  renderPaidRows = () => {
    const { paidOrders } = this.state;

    return paidOrders.map(order => (
      <tr key={order.numberOrder} onClick={() => this.openModal(order)}>
        <td>{order.numberOrder}</td>
        <td>{`R$ ${order.totalOrder}`}</td>
      </tr>
    ));
  };

  openModal = order => {
    this.setState({ isModalOpen: true, modalOrder: order });
  };

  renderRows() {
    const { orders } = this.state;

    return orders.map(order => (
      <tr onClick={() => this.openModal(order)} key={order.numberOrder}>
        <td>{order.numberOrder}</td>
        <td>{`R$ ${order.totalOrder}`}</td>
      </tr>
    ));
  }

  openCashier = () => {
    JazzApi.openCashier().then(resp => {
      alert("Caixa aberto!");
      window.location.reload();
    });
  };

  closeCashier = () => {
    // eslint-disable-next-line no-restricted-globals

    this.props.history.push("/total");
  };

  handleClose = () => {
    this.setState({ isModalOpen: false });
  };

  renderModalRows = () => {
    const { modalOrder } = this.state;

    if (modalOrder) {
      return modalOrder.itens.map(item => (
        <tr key={item.name + item.qtd}>
          <td>{item.name}</td>
          <td>{item.qtd}</td>
        </tr>
      ));
    }
  };

  closeOrder = () => {
    const { modalOrder } = this.state;

    this.setState({
      isModalOpen: false
    });

    JazzApi.closeOrder(modalOrder.numberOrder).then(resp => {
      JazzService.getOrders()
        .then(resp => {
          this.setState({
            orders: resp.data,
            searchedOrders: resp.data,
            isLoading: false,
            isError: false
          });
        })
        .catch(err => {
          this.setState({
            isError: true
          });
        });

      JazzService.getOrdersByValueTrue()
        .then(resp => {
          this.setState({
            paidOrders: resp.data,
            searchedPaidOrders: resp.data,
            isLoading: false,
            isError: false
          });
        })
        .catch(err => {
          this.setState({
            isError: true
          });
        });
    });
  };

  revertOrder = () => {
    const { modalOrder } = this.state;

    this.setState({
      isModalOpen: false
    });

    JazzApi.revertOrder(modalOrder.numberOrder).then(resp => {
      JazzService.getOrders()
        .then(resp => {
          this.setState({
            orders: resp.data,
            searchedOrders: resp.data,
            isLoading: false,
            isError: false
          });
        })
        .catch(err => {
          this.setState({
            isError: true
          });
        });

      JazzService.getOrdersByValueTrue()
        .then(resp => {
          this.setState({
            paidOrders: resp.data,
            searchedPaidOrders: resp.data,
            isLoading: false,
            isError: false
          });
        })
        .catch(err => {
          this.setState({
            isError: true
          });
        });
    });
  };

  reFetch = () => {
    JazzService.getOrders()
      .then(resp => {
        this.setState({
          orders: resp.data,
          searchedOrders: resp.data,
          isLoading: false,
          isError: false
        });
      })
      .catch(err => {
        this.setState({
          isError: true
        });
      });

    JazzService.getOrdersByValueTrue()
      .then(resp => {
        this.setState({
          paidOrders: resp.data,
          searchedPaidOrders: resp.data,
          isLoading: false,
          isError: false
        });
      })
      .catch(err => {
        this.setState({
          isError: true
        });
      });
  };

  render() {
    const {
      isLoading,
      isError,
      isModalOpen,
      modalOrder,
      search,
      searchPaids
    } = this.state;

    return (
      <div>
        <CashierConsumer>
          {isOpen => {
            if (isOpen) {
              return (
                <React.Fragment>
                  <PageHeader name="Pedidos em andamento" small="" />
                  {isError ? (
                    <h3>Ocorreu um erro :c</h3>
                  ) : isLoading ? (
                    <h3>Carregando...</h3>
                  ) : (
                    <React.Fragment>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Pesquiesar pedido"
                        aria-label="Search"
                        value={search}
                        onChange={e => {
                          this.setState(
                            {
                              orders: this.state.searchedOrders,
                              search: e.target.value
                            },
                            () => {
                              console.log(this.state);

                              if (this.state.search !== "") {
                                this.setState({
                                  orders: this.state.orders.filter(
                                    item =>
                                      item.numberOrder === this.state.search
                                  )
                                });
                              } else {
                                this.setState({
                                  orders: this.state.orders
                                });
                              }
                            }
                          );
                        }}
                      />
                      <div style={{ marginTop: 10 }}>
                        <button
                          onClick={() =>
                            this.setState({ search: "" }, () => this.reFetch())
                          }
                          type="button"
                          class="btn btn-primary"
                        >
                          Limpar pesquisa
                        </button>
                        <button
                          style={{ marginLeft: 10 }}
                          onClick={this.reFetch}
                          type="button"
                          class="btn btn-primary"
                        >
                          Atualizar pedidos
                        </button>
                        <button
                          style={{ marginLeft: 10 }}
                          onClick={this.closeCashier}
                          type="button"
                          class="btn btn-primary"
                        >
                          Fechar caixa
                        </button>
                      </div>
                      {this.renderTable()}
                    </React.Fragment>
                  )}

                  <PageHeader name="Pedidos pagos" small="orders" />
                  {isError ? (
                    <h3>Ocorreu um erro :c</h3>
                  ) : isLoading ? (
                    <h3>Carregando...</h3>
                  ) : (
                    <React.Fragment>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Pesquisar pedidos pagos"
                        aria-label="Search"
                        value={searchPaids}
                        onChange={e => {
                          this.setState(
                            {
                              paidOrders: this.state.searchedPaidOrders,
                              searchPaids: e.target.value
                            },
                            () => {
                              if (this.state.searchPaids !== "") {
                                this.setState({
                                  paidOrders: this.state.paidOrders.filter(
                                    item =>
                                      item.numberOrder ===
                                      this.state.searchPaids
                                  )
                                });
                              } else {
                                this.setState({
                                  paidOrders: this.state.paidOrders
                                });
                              }
                            }
                          );
                        }}
                      />
                      <div style={{ marginTop: 10 }}>
                        <button
                          onClick={() =>
                            this.setState({ searchPaids: "" }, () =>
                              this.reFetch()
                            )
                          }
                          type="button"
                          class="btn btn-primary"
                        >
                          Limpar pesquisa de pagos
                        </button>
                      </div>
                      {this.renderPaidTable()}
                    </React.Fragment>
                  )}

                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={this.handleClose}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h2>Pedido {modalOrder && modalOrder.numberOrder}</h2>
                    <table className="table mt-4">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantidade</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderModalRows()}</tbody>
                    </table>
                    {modalOrder && modalOrder.valid ? (
                      <button
                        onClick={this.revertOrder}
                        type="button"
                        class="btn btn-primary"
                      >
                        Reverter
                      </button>
                    ) : (
                      <button
                        onClick={this.closeOrder}
                        type="button"
                        class="btn btn-primary"
                      >
                        Marcar como pago
                      </button>
                    )}
                  </Modal>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment>
                  <h3>Por favor abra o caixa antes de vizualiar pedidos!</h3>
                  <button
                    onClick={this.openCashier}
                    type="button"
                    class="btn btn-primary"
                  >
                    Abrir caixa
                  </button>
                </React.Fragment>
              );
            }
          }}
        </CashierConsumer>
      </div>
    );
  }
}

export default Orders;
