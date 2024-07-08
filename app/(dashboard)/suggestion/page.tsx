"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LightBulbIcon, ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/20/solid'

type Exercise = {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
};

const muscleGroups = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];

const ExercisePage: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string>('chest');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscle}`, {
          headers: { 'X-Api-Key': '7OzZsprEoNGQ8Kv7o+m6KA==LpNqz8YoOdP4kaxC' },
        });
        setExercises(response.data.slice(0, 4)); // Slice to get only top 4 exercises
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [selectedMuscle]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  function formatInstructions(instructions: string) {
    return instructions.split('. ').map((instruction, index) => {
      if (instruction.startsWith('Tip:')) {
        return (
          <div key={index} className="flex items-center p-4 mt-2 bg-yellow-100 border border-yellow-400 rounded-md">
            <LightBulbIcon className="w-14 h-14 text-yellow-500 mr-2" />
            <span className="text-sm text-gray-700">{instruction}</span>
          </div>
        );
      } else if (instruction.startsWith('Caution:') || instruction.startsWith(' Caution:')) {
        return (
          <div key={index} className="flex items-center p-4 mt-2 bg-red-100 border border-red-400 rounded-md">
            <ExclamationCircleIcon className="w-14 h-14 text-red-500 mr-2" />
            <span className="pl-10 text-sm text-gray-700">{instruction}</span>
          </div>
        );
      } else if (instruction.startsWith('Variations:') || instruction.startsWith(' Variations:')) {
        return (
          <div key={index} className="flex items-center p-4 mt-2 bg-blue-100 border border-blue-400 rounded-md">
            <ArrowPathIcon className="w-14 h-14 text-blue-500 mr-2" />
            <span className="text-sm text-gray-700">{instruction}</span>
          </div>
        );
      } else {
        return (
          <li key={index} className="mt-2 text-sm text-gray-500">
            {instruction}
          </li>
        );
      }
    });
  }

  return (
    <div>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight pt-12 text-gray-900">History</h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <label htmlFor="muscle-select">Select Muscle Group: </label>
        <select
          id="muscle-select"
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
        >
          {muscleGroups.map((muscle) => (
            <option key={muscle} value={muscle}>
              {muscle}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 mt-12">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.name}
              className={classNames(
                index === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                index === 1 ? 'sm:rounded-tr-lg' : '',
                index === exercises.length - 2 ? 'sm:rounded-bl-lg' : '',
                index === exercises.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
              )}>
              <div className="mt-8">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {/* Extend touch target to entire panel */}
                  <span aria-hidden="true" className="absolute inset-0" />
                  {exercise.name}
                </h3>
                <div className="flex items-center mt-2">
                  <div
                    className={classNames(
                      'bg-blue-100 text-blue-800 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-blue-500',
                      'mr-2'
                    )}
                  >
                    {exercise.type}
                  </div>
                  <div
                    className={classNames(
                      'bg-green-100 text-green-800 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-500'
                    )}
                  >
                    {exercise.difficulty}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Muscle: {exercise.muscle}</p>
                <p className="mt-2 text-sm text-gray-500">Equipment: {exercise.equipment}</p>
                <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                  {formatInstructions(exercise.instructions)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExercisePage;
