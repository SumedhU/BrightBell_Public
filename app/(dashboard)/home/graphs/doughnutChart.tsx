// page.js this is the entry point of application

"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Doughnut = dynamic(() => import('react-chartjs-2').then((mod) => mod.Doughnut), {
  ssr: false,
});
// <block:setup:1>
const data = {
    labels: [
      'Cardio',
      'Sports',
      'Core',
      'Push',
      'Pull'
    ],
    datasets: [{
      label: 'Sumedh',
      data: [300, 50, 100,0,0],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(100, 205, 50)',
        'rgb(50, 99, 86)'
      ],
      hoverOffset: 4
    }]
};

const DoughnutChart = () => {
  return (
    <div style={{ width: '700px', height: '700px' }}>
      <h1>Types of workouts</h1>
      <Doughnut data={data} />
    </div>
  );
};
export default DoughnutChart;