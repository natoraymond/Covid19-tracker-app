import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, // y
Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Chart.css'


ChartJS.register (
  BarElement, 
  CategoryScale, 
  LinearScale, // y
  Tooltip, 
  Legend
)


function Chart() {
  const data = {
    labels : ['January','February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October','November','December'],
    datasets: [
      {
        label: '369',
        data: [100, 150, 200],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
      },
      {
        label: '333',
        data: [250, 200, 300],
        backgroundColor: 'marine',
        borderColor: 'green',
        borderWidth: 1,
      },
      {
        label: '420',
        data: [300, 350, 400],
        backgroundColor: 'blue',
        borderColor: 'green',
        borderWidth: 1,
      },
      {
        label: '435',
        data: [400, 450, 500],
        backgroundColor: 'red',
        borderColor: 'green',
        borderWidth: 1,
      },
      {
        label: '222',
        data: [500, 550, 600],
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1,
      },
    ]
  }

  const options = {

  }
  return (
    <div className='app__graph'>
      <Bar
        data = {data}
        options= {options}
      ></Bar>
    </div>
    
  );
}

export default Chart;