import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Products} from './components/Products'
//import {Counter} from './components/Counter'


export const App = () => {
  return (
    <BrowserRouter>
    <main>
    <Switch>
    <Route path="/" exact>
    <Products />
    </Route>
    
    </Switch>
    </main>
    
    </BrowserRouter>
  )
}

//export default App;
