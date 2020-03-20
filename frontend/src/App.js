import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import moment from 'moment'

import {Products} from './components/Products'

export const App = () => {
  return (
    <main>
      <Products />
    </main>
  )
}


