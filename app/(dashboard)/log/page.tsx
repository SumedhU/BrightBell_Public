"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Log() {
  const router = useRouter();
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log('Checking authToken:', authToken);
    if (!authToken) {
      router.push('/login');
    }
  }, [router]);
export default function Example() {
  const [exercises, setExercises] = useState([
    { name: '', sets: [{ weight: '', reps: '', unit: 'KG' }] }
  ]);

  const [exerciseLog, setExerciseLog] = useState({
    userId: "1234",
    date: Date.now(),
    currentWeight: '',
    currentWeightUnit: 'KG',
    waterIntakeLiters: '',
    waterIntakeUnit: 'Litres',
    exercises: exercises,
  });

  const validateForm = () => {
    // Check if any exercise name is empty
    if (exercises.some(exercise => exercise.name.trim() === '')) {
      alert('Exercise name cannot be empty.');
      return false;
    }

    // Check if any set weight or reps is empty
    for (const exercise of exercises) {
      for (const set of exercise.sets) {
        if (set.weight.trim() === '' || set.reps.trim() === '') {
          alert('Set weight and reps cannot be empty.');
          return false;
        }
      }
    }

    // Check if other required fields are empty
    if (
      exerciseLog.currentWeight.trim() === '' ||
      exerciseLog.waterIntakeLiters.trim() === ''
    ) {
      alert('Please fill out all required fields.');
      return false;
    }

    return true;
  };

  const handleAddExercise = () => {
    const lastExercise = exercises[exercises.length - 1];
    const lastSet = lastExercise.sets[lastExercise.sets.length - 1];

    if (lastExercise.name && lastSet.weight && lastSet.reps) {
      setExercises([...exercises, { name: '', sets: [{ weight: '', reps: '', unit: 'KG' }] }]);
    } else {
      alert('Please fill out the previous exercise and set before adding a new one.');
    }
  };

  const handleExerciseChange = (index: number, field: string, value: string) => {
    const newExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(newExercises);
  };

  const handleAddSet = (exerciseIndex: number) => {
    const lastSet = exercises[exerciseIndex].sets[exercises[exerciseIndex].sets.length - 1];
    if (lastSet.weight && lastSet.reps) {
      const newExercises = exercises.map((exercise, i) =>
        i === exerciseIndex
          ? { ...exercise, sets: [...exercise.sets, { weight: '', reps: '', unit: 'KG' }] }
          : exercise
      );
      setExercises(newExercises);
    } else {
      alert('Please fill out the previous set before adding a new one.');
    }
  };

  const handleSetChange = (exerciseIndex: number, setIndex: number, field: string, value: string) => {
    const newExercises = exercises.map((exercise, i) =>
      i === exerciseIndex
        ? {
          ...exercise,
          sets: exercise.sets.map((set, j) =>
            j === setIndex ? { ...set, [field]: value } : set
          )
        }
        : exercise
    );
    setExercises(newExercises);
  };

  const handleDeleteExercise = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(exerciseIndex, 1);
    setExercises(updatedExercises);
  };

  const handleDeleteSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(updatedExercises);
  };

  const submitLog = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const logData = {
        userId: "1234",
        date: Date.now(),
        currentWeight: exerciseLog.currentWeight,
        currentWeightUnit: exerciseLog.currentWeightUnit,
        waterIntakeLiters: exerciseLog.waterIntakeLiters,
        waterIntakeUnit: exerciseLog.waterIntakeUnit,
        exercises: exercises,
      };

      const response = await axios.post('/api/log', logData);
      console.log(response);
    } catch (err) {
      console.error('Error saving log:', err);
    }
  };

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const response = await axios.get('/api/log');
        console.log("hello");
        
        if (response.data) {
          const { currentWeight, currentWeightUnit, waterIntakeLiters, waterIntakeUnit, exercises } = response.data[0];
          setExerciseLog({
            ...exerciseLog,
            currentWeight,
            currentWeightUnit,
            waterIntakeLiters,
            waterIntakeUnit,
            exercises
          });
          setExercises(exercises);
          console.log(exercises);
          
        }
      } catch (error) {
        console.error('Error fetching log data:', error);
      }
    };
    fetchLogData();

  }, []);

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Today's Log</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Enter your daily log here.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1">
              <label htmlFor="todaysWeight" className="block text-sm font-medium leading-6 text-gray-900">
                Today's Weight
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="todaysWeight"
                  id="todaysWeight"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  value={exerciseLog.currentWeight}
                  onChange={(e) => setExerciseLog({ ...exerciseLog, currentWeight: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="todaysWeight" className="sr-only">
                    Today's Weight
                  </label>
                  <select
                    id="todaysWeight"
                    name="todaysWeight"
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    value={exerciseLog.currentWeightUnit}
                    onChange={(e) => setExerciseLog({ ...exerciseLog, currentWeightUnit: e.target.value })}
                  >
                    <option value="KG">KG</option>
                    <option value="LBS">LBS</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="waterIntake" className="block text-sm font-medium leading-6 text-gray-900">
                Water Intake
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="waterIntake"
                  id="waterIntake"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  value={exerciseLog.waterIntakeLiters}
                  onChange={(e) => setExerciseLog({ ...exerciseLog, waterIntakeLiters: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="waterIntake" className="sr-only">
                    Water Intake
                  </label>
                  <select
                    id="waterIntake"
                    name="waterIntake"
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    value={exerciseLog.waterIntakeUnit}
                    onChange={(e) => setExerciseLog({ ...exerciseLog, waterIntakeUnit: e.target.value })}
                  >
                    <option value="Litres">Litres</option>
                    <option value="Gallon">Gallon</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {exercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="border-b border-gray-900/10 pb-12">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Workout {exerciseIndex + 1}</h2>
              <button
                type="button"
                onClick={() => handleDeleteExercise(exerciseIndex)}
                className="text-sm font-semibold text-red-600 hover:text-red-700 focus:outline-none"
              >
                Delete Exercise
              </button>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-600">Enter your workout details.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor={`exercise-name-${exerciseIndex}`} className="block text-sm font-medium leading-6 text-gray-900">
                  Exercise name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name={`exercise-name-${exerciseIndex}`}
                    id={`exercise-name-${exerciseIndex}`}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(exerciseIndex, 'name', e.target.value)}
                  />
                </div>
              </div>
              <div
                onClick={() => handleAddSet(exerciseIndex)}
                className="sm:col-span-1 mt-8 ml-10 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white text-center shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Add Set
              </div>
            </div>

            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor={`setWeight-${exerciseIndex}-${setIndex}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Set Weight
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="text"
                      name={`setWeight-${exerciseIndex}-${setIndex}`}
                      id={`setWeight-${exerciseIndex}-${setIndex}`}
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                      value={set.weight}
                      onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label htmlFor={`setWeight-${exerciseIndex}-${setIndex}`} className="sr-only">
                        Set Weight
                      </label>
                      <select
                        id={`setWeight-${exerciseIndex}-${setIndex}`}
                        name={`setWeight-${exerciseIndex}-${setIndex}`}
                        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        value={set.unit}
                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'unit', e.target.value)}
                      >
                        <option value="KG">KG</option>
                        <option value="LBS">LBS</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor={`rep-count-${exerciseIndex}-${setIndex}`} className="block text-sm font-medium leading-6 text-gray-900">
                    Reps
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name={`rep-count-${exerciseIndex}-${setIndex}`}
                      id={`rep-count-${exerciseIndex}-${setIndex}`}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={set.reps}
                      onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:col-span-1 flex items-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteSet(exerciseIndex, setIndex)}
                    className="text-sm font-semibold text-red-600 hover:text-red-700 focus:outline-none"
                  >
                    Delete Set
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div
          onClick={handleAddExercise}
          className="sm:col-span-1 mt-8 ml-10 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white text-center shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer"
        >
          Add Exercise
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="button"
          onClick={submitLog}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
