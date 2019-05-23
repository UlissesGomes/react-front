/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export default props => (
    <nav className="navbar navbar-inverse bg-inverse">
        <div className="container">
            <div className="navbar-header">
                <a className="navbar-brand"> 
                    Jazz Na Avenida
                </a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    <li><a href="/menu">Cardápio</a></li>
                    <li><a href="/associate">Associados</a></li>
                    <li><a href="/orders">Pedidos</a></li>
                </ul>
            </div>
        </div>
    </nav>
)