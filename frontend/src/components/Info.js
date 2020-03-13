import React, {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom' 
import { Link } from 'react-router-dom'


export const Info = () => {
    return (
     <div>
        'show info about app and diabetes and link to livsmedelskollen/livsmedelsverket'
        <div className='sign-in-container'>
          <Link to='/'> <p className='sign-in'>sign in</p></Link>
        </div>
        <Link to={`/`}>
        <div className="backLink"> 
            <div className="arrow">  
            </div> 
            <p>Home</p>
        </div>
        </Link>
        </div>
    )
  }

  