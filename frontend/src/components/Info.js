import React, {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom' 
import { Link } from 'react-router-dom'


export const Info = () => {
    return (
     <div>
       <div className="info">
           <p className="infoText">Denna App riktar sig till typ 1 diabetiker och används för att räkna ut sin egen personliga insulindos beroende på vilket/vilka livsmedel man väljer.<br></br> <br></br> 
           Alla kolhydrater visas per 100g/livsmedel.<br></br> <br></br>
           För mer information kring API och diabetes se nedan.</p>
       </div>
       <div className="links">
      <button className="link-btn"><a href="https://www.livsmedelkollen.se/">livsmedelskollen</a></button> 
      <button className="link-btn"><a href="https://www.livsmedelsverket.se/">livsmedelsverket</a></button>
      <button className="link-btn"><a href="https://www.diabetes.se/">diabetesförbundet</a></button>
       </div>
     
        </div>
    )
  }

  