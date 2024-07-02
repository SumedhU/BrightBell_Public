"use client";

import Steps from "@/app/ui/steps";
import WorkoutIntensity from "@/app/ui/workoutintensity";
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Goals() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [startweight, setStartweight] = useState('');
  const [currentweight, setCurrentweight] = useState('');
  const [goalweight, setGoalweight] = useState('');
  const [waterintake, setWaterintake] = useState('');
  const [workoutIntensity, setWorkoutIntensity] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    
    const storedEmail = sessionStorage.getItem('email');
    const storedPassword = sessionStorage.getItem('password');
    const storedUsername = sessionStorage.getItem('username');
    const storedAbout = sessionStorage.getItem('about');
    const storedFirstname = sessionStorage.getItem('firstname');
    const storedLastname = sessionStorage.getItem('lastname');
    const storedPhone = sessionStorage.getItem('phone');
    const storedStartweight = sessionStorage.getItem('startweight');
    const storedCurrentweight = sessionStorage.getItem('currentweight');
    const storedGoalweight = sessionStorage.getItem('goalweight');
    const storedWaterintake = sessionStorage.getItem('waterintake');
    const storedWorkoutIntensity = sessionStorage.getItem('workoutIntensity');

    
    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
    if (storedUsername) setUsername(storedUsername);
    if (storedAbout) setAbout(storedAbout);
    if (storedFirstname) setFirstname(storedFirstname);
    if (storedLastname) setLastname(storedLastname);
    if (storedPhone) setPhone(storedPhone);
    if (storedStartweight) setStartweight(storedStartweight);
    if (storedCurrentweight) setCurrentweight(storedCurrentweight);
    if (storedGoalweight) setGoalweight(storedGoalweight);
    if (storedWaterintake) setWaterintake(storedWaterintake);
    if (storedWorkoutIntensity) setWorkoutIntensity(storedWorkoutIntensity);
  }, []);

  const handleWorkoutIntensityChange = (newIntensity: string) => {
    setWorkoutIntensity(newIntensity);
    sessionStorage.setItem('workoutIntensity', newIntensity);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!goalweight.trim()) newErrors.goalweight = 'Goal weight is required';
    if (!waterintake.trim()) newErrors.waterintake = 'Water intake is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const userData = {
        firstname,
        lastname,
        email,
        phone,
        username,
        password,
        about,
        startweight,
        currentweight,
        goalweight,
        waterintake,
        workoutIntensity,
      };

      
      try {
        const response = await axios.post('/api/signup', userData);

        if (response.status === 200 || response.status === 201) {
          
          sessionStorage.removeItem('email');
          sessionStorage.removeItem('password');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('about');
          sessionStorage.removeItem('firstname');
          sessionStorage.removeItem('lastname');
          sessionStorage.removeItem('phone');
          sessionStorage.removeItem('startweight');
          
          sessionStorage.removeItem('goalweight');
          sessionStorage.removeItem('waterintake');
          sessionStorage.removeItem('workoutIntensity');

          
          router.push('/login');
        } else {
          throw new Error('Failed to submit user data');
        }
      } catch (error) {
        console.error('Error submitting user data:', error);
        
      }
    }
  };

  const handleCancel = () => {
    router.push('personalInfo');
  };

  return (
    <>
      <Steps />
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 pt-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Goals</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Set your goals here.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-1">
                <label htmlFor="goal-weight" className="block text-sm font-medium leading-6 text-gray-900">
                  Goal Weight
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="goal-weight"
                    id="goal-weight"
                    value={goalweight}
                    onChange={(e) => setGoalweight(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                      id="startingweight"
                      name="startingweight"
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option>KG</option>
                      <option>LBS</option>
                    </select>
                  </div>
                </div>
                {errors.goalweight && <p className="mt-2 text-sm text-red-600">{errors.goalweight}</p>}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="water-intake" className="block text-sm font-medium leading-6 text-gray-900">
                  Water Intake
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="water-intake"
                    id="water-intake"
                    value={waterintake}
                    onChange={(e) => setWaterintake(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                      id="waterintake"
                      name="waterintake"
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option>Litres</option>
                      <option>Gallon</option>
                    </select>
                  </div>
                </div>
                {errors.waterintake && <p className="mt-2 text-sm text-red-600">{errors.waterintake}</p>}
              </div>

              <div className="sm:col-span-1">
                <WorkoutIntensity onChange={handleWorkoutIntensityChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button 
            type="button" 
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
