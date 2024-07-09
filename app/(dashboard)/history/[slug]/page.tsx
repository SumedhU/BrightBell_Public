"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface ExerciseSet {
  weight: number;
  reps: number;
  unit: string;
}

interface ExerciseLogEntry {
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

export default function Page({ params }: { params: { slug: string } }) {
  const [exerciseLog, setExerciseLog] = useState<ExerciseLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExerciseLog = async () => {
      try {
        if (params.slug) {
          const logId = params.slug as string;
          const response = await axios.get(`/api/daylog?logId=${logId}`);
          setExerciseLog(response.data);
          setLoading(false);
        } else {
          console.error('No logId provided in router.query.slug');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching exercise log:', error);
        setLoading(false);
        // Handle error state or display error message
      }
    };
    fetchExerciseLog();
  },); // Dependency array ensures useEffect runs when slug changes and router is ready

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while data is being fetched
  }

  if (!exerciseLog || exerciseLog.length === 0) {
    return <div>No exercise log available</div>; // Handle case where no exercise log is found
  }

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Exercise Log</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Daily exercise details.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {exerciseLog.map((logEntry, index) => (
            <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Date</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{logEntry.date}</dd>

              <dt className="text-sm font-medium leading-6 text-gray-900">Weight</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{logEntry.currentWeight} {logEntry.currentWeightUnit}</dd>

              <dt className="text-sm font-medium leading-6 text-gray-900">Water Intake</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{logEntry.waterIntakeLiters} {logEntry.waterIntakeUnit}</dd>

              <dt className="text-sm font-medium leading-6 text-gray-900">Exercises</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  {logEntry.exercises.map((exercise, exIndex) => (
                    <li key={exIndex} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="items-center">
                        <span className="truncate font-medium">{exercise.name} </span>
                         Sets: {exercise.sets.map(set =>
                            <p className="ml-4 flex-shrink-0 text-gray-400">
                                {set.weight}{set.unit} x {set.reps}
                            </p>
                            )
                        }
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
