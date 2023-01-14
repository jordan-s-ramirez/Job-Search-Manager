import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);  

export default function DoughnutGraph(props) {
  const data = {
    labels: props.data.labels,
    datasets: [{
      label: 'Doughnut Graph',
      data: props.data.pieData,
      backgroundColor: props.data.rgbData,
      hoverOffset: 4
    }]
  };

  return(
    <Doughnut data={data}/>
  );
}