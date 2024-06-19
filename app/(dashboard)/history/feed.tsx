
import { BoltIcon, StarIcon } from '@heroicons/react/20/solid'

const timeline = [
  {
    id: 1,
    content: 'Light Workout',
    target: 'Cardio',
    href: '#',
    date: 'Jun 02',
    datetime: '2024-06-02',
    icon: BoltIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Intense Workout',
    target: 'Chest',
    href: '#',
    date: 'Jun 03',
    datetime: '2024-06-03',
    icon: StarIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: 'Light Workout',
    target: 'Cardio',
    href: '#',
    date: 'Jun 04',
    datetime: '2024-06-04',
    icon: BoltIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 4,
    content: 'Intense Workout',
    target: 'Chest',
    href: '#',
    date: 'Jun 05',
    datetime: '2024-06-05',
    icon: StarIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Light Workout',
    target: 'Cardio',
    href: '#',
    date: 'Jun 06',
    datetime: '2024-06-06',
    icon: BoltIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id:6,
    content: 'Intense Workout',
    target: 'Chest',
    href: '#',
    date: 'Jun 07',
    datetime: '2024-06-07',
    icon: StarIcon,
    iconBackground: 'bg-blue-500',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Feed() {
  return (
    <div className="flow-root py-10 px-10">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
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
                    <p className="text-sm text-gray-500">
                      {event.content}{' '}
                      <a href={event.href} className="font-medium text-gray-900">
                        {event.target}
                      </a>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.datetime}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-sm pt-4">
        <a href="/resetpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
          See all
        </a>
      </div>
    </div>
  )
}
