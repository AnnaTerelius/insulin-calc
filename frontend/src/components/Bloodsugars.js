import React, {useState, useEffect, Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom' 
import { Link } from 'react-router-dom'
import moment from 'moment'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


import './bloodsugar.css'

am4core.useTheme(am4themes_animated);


const backendUrl = process.env.BACKEND_URL || "http://localhost:9090"


export const Bloodsugars = () => {
  const [bloodsugars, setBloodsugars] = useState([])

     useEffect(() => {
      fetch(backendUrl+'/allbloodsugars')
      .then (res => res.json())
      .then (json => setBloodsugars(json));
    }, []);

   
useEffect(() =>  {
  let chart = am4core.create("chartdiv", am4charts.XYChart);
  //let series = chart.series.create();
  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Setting up data fields in Pie series
let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "createdAt";
    series.dataFields.valueY = "value";
//series.dataFields.value = "visites";
//series.dataFields.category = "country";

let data = [{
    "createdAt": "2020-03-10 12:05",
    "value": 6
  }, {
    "createdAt": "2020-03-13 13:05",
    "value": 5
  }]
  

 

  chart.data = bloodsugars
  console.log(bloodsugars)
}, [bloodsugars]); 



 


    return (
      <div className="backgroundContainer">
       
         <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
          
        <div className="container1">
        <div className="linkHome"> <p>Home</p></div>
        
        <div className="container">
         <ul>
        {bloodsugars.map((bloodsugar) => (
          <li className="listOfBloodsugars">BS Level: {bloodsugar.value}Day:{moment(bloodsugar.createdAt).format('dddd')}</li>
          
        ))}
       
      </ul>
      </div>
      <Link to={`/`}>
      <div className="backLink"> 
          <div className="arrow">  
          </div> 
         
      </div>
      </Link>
      </div>
      </div>
     
    )
  }