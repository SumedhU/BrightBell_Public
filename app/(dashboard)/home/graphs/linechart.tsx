"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: '', 
        data: new Array(12).fill(0), 
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });
  const [error, setError] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string>('');
  

  useEffect(() => {
    console.log('--------------------');
    console.log(localStorage.getItem('firstname'));
    
    console.log('--------------------');
    const storedFirstname = localStorage.getItem('firstname') || '';
    

    setFirstname(storedFirstname);
   

    const fetchExerciseData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in localStorage');
        }

        const response = await axios.get(`/api/exercises?userId=${userId}`);
        const data = response.data;

        const weightData = new Array(12).fill(0);

        data.forEach((exercise: any) => {
          const date = new Date(exercise.date);
          const month = date.getMonth(); 
          weightData[month] += parseInt(exercise.currentWeight, 10);
        });

        setChartData(prevData => ({
          ...prevData,
          datasets: [{
            ...prevData.datasets[0],
            label: `${firstname}'s Weight`, 
            data: weightData,
          }],
        }));
      } catch (error) {
        console.error('Error fetching exercise data:', error);
        setError('Failed to fetch exercise data');
      }
    };

    fetchExerciseData();
  }, [firstname]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: '500px', height: '500px' }}>
      {/* <h2>{firstname}'s Exercise Weight Chart</h2> */}
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
