import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import PageHeader from '../components/pageheader'
import Grid from '../components/grid'
import axios from 'axios'

import "react-datepicker/dist/react-datepicker.css";

const URL = "http://localhost:3003/api/associate"

const initialState = {
  associate: {
    cpf: '',
    name: '',
    associateDate: new Date()
  },
  startDate: new Date(),
  list: []
}

export default class Associate extends Component {

  state = { ...initialState }

  componentWillMount() {
    axios.get(URL)
      .then(resp => {
        this.setState({ list: resp.data })
      })
  }

  clear() {
    this.setState({ associate: initialState.associate })
  }

  save() {
    const associate = this.state.associate
    associate.associateDate = this.formatDate(this.state.startDate)
    const method = associate._id ? 'put' : 'post'
    const url = associate._id ? `${URL}/${associate._id}` : URL
    axios[method](url, associate)
      .then(resp => {
        const list = this.getUpdateList(resp.data)
        this.setState({ associate: initialState.associate, list })
      })
  }

  load(associate) {
    this.setState({ associate })
  }

  remove(associate) {
    axios.delete(`${URL}/${associate._id}`)
      .then(resp => {
        const list = this.getUpdateList(associate, false)
        this.setState({ list })
      })

  }

  getUpdateList(associate, add = true) {
    const list = this.state.list.filter(i => i._id !== associate._id)
    if (add) list.unshift(associate)
    return list
  }

  updateField(event) {
    const associate = { ...this.state.associate }
    associate[event.target.name] = event.target.value
    this.setState({ associate })
  }

  print() {
    const associate = this.state.associate
    associate.associateDate = this.formatDate(this.state.startDate)
    console.log(associate)
  }

  handleChange(date) {
    const associate = { ...this.state.associate }
    const formtDate = this.formatDate(date)
    associate.associateDate = formtDate
    this.setState({ associate })
    this.setState({
      startDate: date
    });
  }

  formatDate(date){
    var data = date,
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Data de associação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderRows() {
    return this.state.list.map(associate => {

      return (
        <tr key={associate._id}>
          <td>{associate.cpf}</td>
          <td>{associate.name}</td>
          <td>{associate.associateDate}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(associate)}>
              <i className="fa fa-pencil"></i>
            </button>
            <label> -- </label>
            <button className="btn btn-danger ml-5" onClick={() => this.remove(associate)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }


  renderForm() {
    return (
      <div role="form" className="associateForm">
        <Grid cols='12 9 10'>

          <h4>CPF do Associado</h4>
          <input id="cpf"
            name="cpf" value={this.state.associate.cpf} onChange={e => this.updateField(e)}
            type="text" placeholder="CPF do associado" className="form-control" />

          <h4>Nome do associado</h4>
          <input id="name" name="name" onChange={e => this.updateField(e)}
            value={this.state.associate.name}
            type="text" placeholder="Nome do associado" className="form-control" />

        </Grid>

        <Grid cols="12 9 10">
        <h4>Data da associação</h4>
        <DatePicker
            name="associateDate"
            onChange={e => this.handleChange(e)}
            selected={this.state.startDate}
            dateFormat="dd/MM/yyyy"
            />
        </Grid>

        <Grid cols="12 9 10">
          <br></br>
          <button className="btn btn-primary" onClick={e => this.save(e)} >
            <i className="fa fa-plus"> ADICIONAR</i>
          </button>
        </Grid>

      </div>
    )
  }


  render() {
    return (
      <div>
        <PageHeader name="Associados" small="Cadastro"></PageHeader>
        {this.renderForm()}
        <PageHeader name="Associados" small="Lista"></PageHeader>
        {this.renderTable()}
      </div>
    )
  }
}
