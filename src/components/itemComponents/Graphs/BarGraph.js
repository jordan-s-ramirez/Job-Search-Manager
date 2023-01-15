import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function BarGraph(props) {
  const options = {
    plugins: {
      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  
  const labels = props.data.labels;
  
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: props.data.pieData,
        backgroundColor: props.data.rgbData,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}