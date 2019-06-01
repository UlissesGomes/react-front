import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "../src/Routes";
import { CashierProvider } from "./context/CashierContext";
import JazzApi from "./Services/JazzApi";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const theme = createMuiTheme();

class App extends Component {
  state = {
    isLoading: true,
    isCashierOpen: false
  };

  componentDidMount() {
    JazzApi.checkCashier().then(resp => {
      this.setState({
        isLoading: false,
        isCashierOpen: resp.data
      });
    });
  }

  render() {
    const { isCashierOpen, isLoading } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <CashierProvider value={isCashierOpen}>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <div className="container">
              <Routes />
            </div>
          )}
        </CashierProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
