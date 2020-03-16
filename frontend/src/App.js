import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import moment from 'moment'

import {Products} from './components/Products'
import {Bloodsugars} from './components/Bloodsugars'
import {Info} from './components/Info'

export const App = () => {
  return (
    <main>
      <Products />
    </main>
  )
}


