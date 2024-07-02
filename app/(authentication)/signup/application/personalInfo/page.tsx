"use client";

import Steps from '@/app/ui/steps';
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react';

export default function PersonalInfo() {
  const router = useRouter();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [startweight, setStartweight] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!firstname.trim()) newErrors.firstname = 'First name is required';
    if (!lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!startweight.trim()) newErrors.startweight = 'Starting weight is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      sessionStorage.setItem('firstname', firstname);
      sessionStorage.setItem('lastname', lastname);
      sessionStorage.setItem('phone', phone);
      sessionStorage.setItem('startweight', startweight);

      router.push('goals');
    }
  };

  const handleCancel = () => {
    router.push('publicInfo');
  };

  return (
    <>
      <Steps />
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 pt-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.firstname && <p className="mt-2 text-sm text-red-600">{errors.firstname}</p>}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.lastname && <p className="mt-2 text-sm text-red-600">{errors.lastname}</p>}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country"
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option>US</option>
                      <option>CA</option>
                      <option>EU</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="+1 (555) 987-6543"
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="start-weight" className="block text-sm font-medium leading-6 text-gray-900">
                  Starting Weight
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="start-weight"
                    id="start-weight"
                    value={startweight}
                    onChange={(e) => setStartweight(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="startingweight" className="sr-only">
                      Starting Weight
                    </label>
                    <select
                      id="startingweight"
                      name="startingweight"
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option>KG</option>
                      <option>LBS</option>
                    </select>
                  </div>
                  {errors.startweight && <p className="mt-2 text-sm text-red-600">{errors.startweight}</p>}
                </div>
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
            Next
          </button>
        </div>
      </form>
    </>
  );
}
