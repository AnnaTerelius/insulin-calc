import React, {useState, useEffect, Component} from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import './bloodsugar.css'

am4core.useTheme(am4themes_animated);

export const Bloodsugars = () => {
  const [bloodsugars, setBloodsugars] = useState([])

     useEffect(() => {
      fetch('https://insulin-calc-deployment.herokuapp.com/allbloodsugars')
      .then (res => res.json())
      .then (json => setBloodsugars(json));
    }, []);
  
useEffect(() =>  {
  let chart = am4core.create("chartdiv", am4charts.XYChart);
  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "createdAt";
      series.dataFields.valueY = "value";
  
  chart.data = bloodsugars
  console.log(bloodsugars)
}, [bloodsugars]); 

  return (
      <div>
        <div >
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
      </div>
    )
  }