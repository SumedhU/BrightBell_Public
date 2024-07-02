"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});
const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
        label: 'Sumedh\'s Weight',
        data: [75,75,78,76,77],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
  ],
};
const LineChart = () => {
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <Line data={data} />
    </div>
  );
};
export default LineChart;