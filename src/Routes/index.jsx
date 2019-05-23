import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Menu from '../ItemMenu'
import Associate from '../Associate'
import Orders from '../Orders'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/associate' component={Associate}></Route>
            <Route path='/menu' component={Menu}></Route>
            <Route path='/orders' component={Orders}></Route>
            <Redirect from='*' to='/menu' />
        </Switch>
    </BrowserRouter>

)

export default Routes

