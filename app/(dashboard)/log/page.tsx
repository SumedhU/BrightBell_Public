"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Log() {
  const router = useRouter();
  const [isNew, setIsNew] = useState(true);
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
    var updatedExercises = [...exercises];
    if (updatedExercises.length == 1) {
      updatedExercises = [];
    } else{
      updatedExercises.splice(exerciseIndex, 1);
    }
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
    const date = new Date();
    try {
      const logData = {
        userId: 
        localStorage.getItem('authToken'),
        date: date.toJSON().slice(0, 10),
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

  const updateLog = async () => {
    if (!validateForm()) {
      return;
    }
    const date = new Date();
    try {
      const logData = {
        userId: 
        localStorage.getItem('authToken'),
        currentWeight: exerciseLog.currentWeight,
        currentWeightUnit: exerciseLog.currentWeightUnit,
        waterIntakeLiters: exerciseLog.waterIntakeLiters,
        waterIntakeUnit: exerciseLog.waterIntakeUnit,
        exercises: exercises,
      };

      const response = await axios.put('/api/log', logData);
      console.log(response);
    } catch (err) {
      console.error('Error saving log:', err);
    }
  };
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log('Checking authToken:', authToken);
    if (!authToken) {
      router.push('/login');
    } else {
      const fetchLogData = async () => {
        try {
          const response = await axios.get(`/api/log?id=${localStorage.getItem('authToken')}`);
          if (response.data) {
            setIsNew(response.data.length == 0);
            const { currentWeight, currentWeightUnit, waterIntakeLiters, waterIntakeUnit, exercises } = response.data[0];
            setExerciseLog({
              ...exerciseLog,
              currentWeight,
              currentWeightUnit,
              waterIntakeLiters,
              waterIntakeUnit,
              exercises
            });
            if (exercises.length == 0) {
              setExercises([
                { name: '', sets: [{ weight: '', reps: '', unit: 'KG' }] }
              ])
            }else{
              setExercises(exercises);
            }
            console.log(exercises);
          }
        } catch (error) {
          console.error('Error fetching log data:', error);
        }
      };
      fetchLogData();
    }
  }, [router, setExerciseLog, setExercises]);

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-3xl font-bold leading-tight tracking-tight pt-12 text-gray-900">Today&apos;s Log</h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Enter your daily log here.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1">
              <label htmlFor="todaysWeight" className="block text-sm font-medium leading-6 text-gray-900">
                Today&apos;s Weight
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
                    Today&apos;s Weight
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
                    <option value="Gallons">Gallons</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Exercises</h2>
            {exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-1">
                    <label htmlFor={`exerciseName-${exerciseIndex}`} className="block text-sm font-medium leading-6 text-gray-900">
                      Exercise Name
                    </label>
                    <input
                      type="text"
                      name={`exerciseName-${exerciseIndex}`}
                      id={`exerciseName-${exerciseIndex}`}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(exerciseIndex, 'name', e.target.value)}
                    />
                    <button
                      type="button"
                      className="mt-2 bg-red-500 text-white px-2 py-1 rounded-md"
                      onClick={() => handleDeleteExercise(exerciseIndex)}
                    >
                      Delete Exercise
                    </button>
                  </div>
                  {exercise.sets.map((set, setIndex) => (
                    <div key={setIndex} className="sm:col-span-1">
                      <label htmlFor={`setWeight-${exerciseIndex}-${setIndex}`} className="block text-sm font-medium leading-6 text-gray-900">
                        Set Weight
                      </label>
                      <input
                        type="text"
                        name={`setWeight-${exerciseIndex}-${setIndex}`}
                        id={`setWeight-${exerciseIndex}-${setIndex}`}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={set.weight}
                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                      />
                      <label htmlFor={`setReps-${exerciseIndex}-${setIndex}`} className="block text-sm font-medium leading-6 text-gray-900">
                        Set Reps
                      </label>
                      <input
                        type="text"
                        name={`setReps-${exerciseIndex}-${setIndex}`}
                        id={`setReps-${exerciseIndex}-${setIndex}`}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={set.reps}
                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                      />
                      <button
                        type="button"
                        className="mt-2 bg-red-500 text-white px-2 py-1 rounded-md"
                        onClick={() => handleDeleteSet(exerciseIndex, setIndex)}
                      >
                        Delete Set
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-4 bg-green-500 text-white px-2 py-1 rounded-md"
                    onClick={() => handleAddSet(exerciseIndex)}
                  >
                    Add Set
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="mt-4 bg-blue-500 text-white px-2 py-1 rounded-md"
              onClick={handleAddExercise}
            >
              Add Exercise
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href='/home' className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </a>
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={isNew?submitLog:updateLog}
        >
          Save
        </button>
      </div>
    </form>
  );
}
