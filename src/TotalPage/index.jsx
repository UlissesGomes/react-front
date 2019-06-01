import React from "react";
import PageHeader from "../components/pageheader";
import JazzApi from "../Services/JazzApi";

class TotalPage extends React.Component {
  state = {
    value: 0,
    isLoading: true
  };

  componentDidMount() {
    JazzApi.getTotal().then(result => {
      this.setState({ value: result.data, isLoading: false });
    });
  }

  closeCash = () => {
    // eslint-disable-next-line no-restricted-globals
    const shouldClose = confirm("Tem certeza que quer fechar o caixa?");
    if (shouldClose) {
      JazzApi.closeCashier().then(resp => {
        alert("Caixa fechado!");
        this.props.history.push({
          pathname: "/menu",
          state: { shouldReload: true }
        });
      });
    }
  };

  render() {
    return (
      <div>
        <PageHeader name="Caixa" small="total" />
        <div className="alert alert-success" role="alert">
          {this.state.isLoading
            ? "Carregando total..."
            : `O total dessa noite é R$ ${this.state.value}`}
        </div>
        <button
          style={{ marginTop: 10 }}
          onClick={this.closeCash}
          type="button"
          class="btn btn-primary"
        >
          Fechar caixa
        </button>
      </div>
    );
  }
}

export default TotalPage;
