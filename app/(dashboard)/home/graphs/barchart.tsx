"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChartData, ChartDataset } from 'chart.js';

interface ExerciseSet {
  weight: string;
  reps: string;
  unit: string;
}

interface Exercise {
  _id: {
    $oid: string;
  };
  userId: string;
  date: string;
  currentWeight: string;
  currentWeightUnit: string;
  waterIntakeLiters: string;
  waterIntakeUnit: string;
  exercises: {
    name: string;
    sets: ExerciseSet[];
  }[];
}

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

const BarChart = () => {
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [],
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
        const data: Exercise[] = response.data;

        const workoutCounts = Array.from({ length: 12 }, () => 0);

        data.forEach((exercise: Exercise) => {
          const date = new Date(exercise.date);
          const month = date.getMonth(); 

          exercise.exercises.forEach(({ name }) => {
            workoutCounts[month]++;
          });
        });

        const datasets: ChartDataset<"bar">[] = [{
          label: `${firstname}'s Workouts per Month`,
          data: workoutCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }];

        setChartData({
          ...chartData,
          datasets: datasets,
        });
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      }
    };

    fetchData();
  }, [firstname]); 

  return (
    <div style={{ width: '500px', height: '500px' }}>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
