import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BarGraph(props) {
  const data = {
    labels: props.data.labels,
    datasets: [{
      label: 'Bar Graph',
      data: props.data.pieData,
      backgroundColor: props.data.rgbData,
      hoverOffset: 4
    }]
  };

  return(
    <Bar data={data}/>
  );
}