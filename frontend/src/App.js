import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import moment from 'moment'

import {Products} from './components/Products'
import {Bloodsugars} from './components/Bloodsugars'
import {Info} from './components/Info'



export const App = () => {
  return (
    <BrowserRouter>
    <main>
      <Switch>
        <Route path="/" exact>
          <Products />
        </Route>
        <Route path="/bloodsugars" exact>
          <Bloodsugars />
        </Route>
        <Route path="/info" exact>
          <Info />
        </Route>
      </Switch>
    </main>
    
    </BrowserRouter>
  )
}


