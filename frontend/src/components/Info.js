import React, {useState} from 'react'
//import {BrowserRouter, Switch, Route} from 'react-router-dom' 
//import { Link } from 'react-router-dom'

export const Info = () => {
    return (
        <div>
            <div className="info">
                <p className="infoText">Denna App riktar sig till typ 1 diabetiker och används för att räkna ut sin egen personliga insulindos beroende på vilket/vilka livsmedel man väljer.<br></br> <br></br> 
                Alla kolhydrater visas per 100g/livsmedel.<br></br> <br></br>
                För mer information kring API och diabetes se nedan.</p>
            </div>
            <div className="links">
                <a href="https://www.livsmedelkollen.se/" target="_blank"><button className="link-btn">livsmedelskollen</button></a> 
                <a href="https://www.livsmedelsverket.se/" target="_blank"><button className="link-btn">livsmedelsverket</button></a>
                <a href="https://www.diabetes.se/" target="_blank"><button className="link-btn">diabetesförbundet</button></a>
            </div>
        </div>
    )
  }

  