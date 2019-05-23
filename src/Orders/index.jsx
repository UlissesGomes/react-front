import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../components/pageheader'

const URL = "http://localhost:3003/api/orders"


const initialState = {
  order: {
    numberOrder: '',
    date: '',
    itens: [

    ]
  },
  startDate: new Date(),
  list: []
}

export default class Orders extends Component {

  state = { ...initialState }

  componentWillMount() {
    axios.get(URL)
      .then(resp => {
        this.setState({ list: resp.data })
      })
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
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderItens(order) {
    return order.itens.map(item => {
      return (
        <table>
          <tbody>
            <tr>
              <td>
                Nome: {item.name} // 
              </td>
              <td>
                Quantidade: {item.qtd}
              </td>
            </tr>
          </tbody>
        </table>

      )
    })
  }

  renderRows() {
    return this.state.list.map(order => {
      return (
        <tr key={order._id}>
          <td>{order.numberOrder}</td>
          <td>{order.date}</td>
          <td>
            { this.renderItens(order) }
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <PageHeader name="Pedidos" small="Lista"></PageHeader>
        {this.renderTable()}
      </div>
    )
  }
}
