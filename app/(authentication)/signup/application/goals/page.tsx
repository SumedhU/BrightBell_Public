import Steps from "@/app/ui/steps";
import WorkoutIntensity from "@/app/ui/workoutintensity";

export default function Goals() {
    return (
        <>
        <Steps></Steps>
             <form>
             <div className="space-y-12 pt-12">
                    <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Goals</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    
                    <div className="sm:col-span-1">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Goal Weight
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                            type="text"
                            name="price"
                            id="price"
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
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Water Intake
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="0.00"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                            <label htmlFor="waterintake" className="sr-only">
                                Starting Weight
                            </label>
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
                    </div>
                    <div className="sm:col-span-1">
                        <WorkoutIntensity />
                    </div>
                </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    We'll always let you know about important changes, but you pick what else you want to hear about.
                </p>

                <div className="mt-10 space-y-10">
                    <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                            id="waterintake"
                            name="waterintake"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="waterintake" className="font-medium text-gray-900">
                            Water Intake
                            </label>
                            <p className="text-gray-500">Get notified when it's time to get hydrated.</p>
                        </div>
                        </div>
                        <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                            id="logworkout"
                            name="logworkout"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="logworkout" className="font-medium text-gray-900">
                            Log Workout
                            </label>
                            <p className="text-gray-500">Get notified when it's time to log your workout.</p>
                        </div>
                        </div>
                    </div>
                    </fieldset>
                    <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                    <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                        <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                            Everything
                        </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                        <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                            Same as email
                        </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                        <input
                            id="push-nothing"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                            No push notifications
                        </label>
                        </div>
                    </div>
                    </fieldset>
                </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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