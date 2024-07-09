"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

interface ExerciseSet {
  weight: string;
  reps: string;
  unit: string;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

const DoughnutChart = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      hoverOffset: number;
    }[];
  }>({
    labels: [],
    datasets: [{
      label: 'User\'s Workouts',
      data: [],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(100, 205, 50)',
        'rgb(50, 99, 86)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(100, 205, 50)',
        'rgb(50, 99, 86)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }]
  });

  const [firstname, setFirstname] = useState<string>('');

  useEffect(() => {
    const storedFirstname = localStorage.getItem('firstname') || '';
    setFirstname(storedFirstname);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`/api/exercises?userId=${userId}`);
        const data: any[] = response.data; 

        const exerciseCounts: Record<string, number> = {};

        data.forEach((exercise: { exercises: Exercise[] }) => {
          exercise.exercises.forEach(({ name }) => {
            if (!exerciseCounts[name]) {
              exerciseCounts[name] = 0;
            }
            exerciseCounts[name]++;
          });
        });

        const updatedData = {
          labels: Object.keys(exerciseCounts),
          datasets: [{
            ...chartData.datasets[0],
            label: `${firstname}'s Workouts`, // Update label to include firstname
            data: Object.values(exerciseCounts)
          }]
        };

        setChartData(updatedData);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    fetchData();
  }, [firstname]); // Depend on firstname to trigger data fetching

  return (
    <div style={{ width: '700px', height: '700px' }}>
      <h1>Types of workouts</h1>
      <Doughnut data={chartData} />
    </div>
  );
};

export default DoughnutChart;
