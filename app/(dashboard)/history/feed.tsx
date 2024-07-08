import { useEffect, useState } from 'react';
import axios from 'axios';
import { BoltIcon, StarIcon } from '@heroicons/react/20/solid';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';

interface ExerciseSet {
  weight: string;
  reps: string;
  unit: string;
}

interface ExerciseLog {
  _id: string;
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

const timelineData = [
  {
    id: 1,
    content: 'Light Workout',
    currentWeight: 'Cardio',
    waterIntake: '100',
    href: '#',
    date: 'Jun 02',
    datetime: '2024-06-02',
    icon: BoltIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Intense Workout',
    currentWeight: 'Chest',
    waterIntake: '100',
    href: '#',
    date: 'Jun 03',
    datetime: '2024-06-03',
    icon: StarIcon,
    iconBackground: 'bg-blue-500',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Feed: React.FC = () => {
  const [timeline, setTimeline] = useState(timelineData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/history?id=${localStorage.getItem('authToken')}`);
        const logs = response.data;

        const newTimeline = logs.map((log: ExerciseLog, index: number) => ({
          id: index + 1,
          content: log.exercises.length == 0 ?'No Workout': log.exercises.length < 5 ?'Light Workout': log.exercises.length < 11 ? 'Intense Workout': 'Extreme Workout', // Adjust based on your data structure
          currentWeight: log.currentWeight + " " + log.currentWeightUnit, // Adjust based on your data structure
          waterIntake: log.waterIntakeLiters + " " + log.waterIntakeUnit,
          href: '#',
          date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), // Adjust date format as needed
          datetime: log.date,
          icon: log.exercises.length == 0 ? HandThumbDownIcon : log.exercises.length < 5 ? HandThumbUpIcon: log.exercises.length < 11 ? StarIcon: BoltIcon, // Adjust icon selection based on data
          iconBackground: log.exercises.length == 0 ? 'bg-gray-400' : 'bg-blue-500', // Adjust based on your data
        }));

        setTimeline(newTimeline);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flow-root py-10 px-10">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
            {eventIdx !== timeline.length - 1 ? (
                <span aria-hidden="true" className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white'
                    )}
                  >
                    <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <a href={event.href} className="font-medium text-gray-900">
                      {event.content}
                    </a>
                    <p  className="text-sm text-gray-500">
                      Weight {event.currentWeight}
                    </p>
                    <p  className="text-sm text-gray-500">
                      Water Intake {event.waterIntake}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.datetime}>{event.datetime}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* <div className="text-sm pt-4">
        <a href="/resetpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
          See all
        </a>
      </div> */}
    </div>
  );
};

export default Feed;
