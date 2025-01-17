"use client";
import { Fragment, useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const workout = [
  { id: 1, name: '1 Session per Week', intensity: "Beginner" },
  { id: 2, name: '2 Session per Week', intensity: "Beginner" },
  { id: 3, name: '3 Session per Week', intensity: "Healthy" },
  { id: 4, name: '4 Session per Week', intensity: "Healthy" },
  { id: 5, name: '5 Session per Week', intensity: "Pro" },
  { id: 6, name: '6 Session per Week', intensity: "Pro" },
  { id: 7, name: '7 Session per Week', intensity: "Dangerous" },
]

function classNames(...classes: (string | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function WorkoutIntensity({ onChange }: { onChange: (newIntensity: string) => void }) {
  const [selected, setSelected] = useState(workout[3]);

  const handleChange = (selectedOption: typeof workout[0]) => {
    setSelected(selectedOption);
    onChange(selectedOption.intensity); // Call the onChange prop with the selected intensity
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <Label className="block text-sm font-medium leading-6 text-gray-900">Workout Intensity</Label>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {workout.map((person) => (
                  <ListboxOption
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {person.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
