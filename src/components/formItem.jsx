import React from 'react'

import Grid from '../components/grid'

const formItem = props => {
    return (
        <div role="form" className="itemForm" onSubmit={props.onSubmit}>
            <Grid cols='12 9 10'>
                <h4>Nome do produto</h4>
                <input id="name" name="name" 
                    value={ props.itemName } onChange={ props.handleChange }
                    type="text" placeholder="Nome do produto" className="form-control" />

                <h4>Descrição</h4>
                <input id="description" name="description"
                    type="text" placeholder="Descrição do produto" className="form-control" />

                <h4>Valor em dinheiro</h4>
                <input id="priceCash" name="priceCash"
                    type="number" placeholder="Valor em dinheiro" className="form-control" />

                <h4>Valor em débito</h4>
                <input id="priceDebit" name="priceDebit"
                    type="number" placeholder="Valor em débito" className="form-control" />
            </Grid>

            <Grid cols='12 9 10'>
                <h4>Selecione o tipo:</h4>
                <select className="form-control" id="sel1">
                    <option>COMIDA</option>
                    <option>BEBIDA</option>
                </select>
            </Grid>

            <Grid cols="12 9 10">
                <br></br>
                <button className="btn btn-primary">
                    <i className="fa fa-plus"> ADICIONAR PRODUTO</i>
                </button>
            </Grid>

        </div>
    )
}

export default formItem
