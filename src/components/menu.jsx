/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

export default props => (
  <nav className="navbar navbar-inverse bg-inverse">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand">Jazz Na Avenida</a>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/menu">Cardápio</Link>
          </li>
          <li>
            <Link to="/associate">Associados</Link>
          </li>
          <li>
            <Link to="/orders">Pedidos</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
