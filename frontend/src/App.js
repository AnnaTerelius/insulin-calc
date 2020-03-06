import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Products} from './components/Products'
import {Counter} from './components/Counter'


export const App = () => {
  return (
    <main>
    <Products />
    <Counter />
   
    </main>
  )
}

//export default App;
