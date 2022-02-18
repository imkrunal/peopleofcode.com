import {
  // AcademicCapIcon,
  // AdjustmentsIcon,
  // CogIcon,
  // OfficeBuildingIcon,
  PuzzleIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import { classNames } from '../../utils/helpers'

const navigation = [
  {
    name: 'Basic Information',
    href: '/settings',
    icon: UserCircleIcon,
    current: true,
  },
  // {
  //   name: 'Employment',
  //   href: '/settings/employment',
  //   icon: OfficeBuildingIcon,
  //   current: false,
  // },
  // {
  //   name: 'Experience',
  //   href: '/settings/experience',
  //   icon: CogIcon,
  //   current: false,
  // },
  // {
  //   name: 'Skills',
  //   href: '/settings/skills',
  //   icon: AdjustmentsIcon,
  //   current: false,
  // },
  // {
  //   name: 'Education',
  //   href: '/settings/education',
  //   icon: AcademicCapIcon,
  //   current: false,
  // },
  {
    name: 'Work Preferences',
    href: '/settings/work-preferences',
    icon: PuzzleIcon,
    current: false,
  },
]

const SettingsSidebar = () => {
  return (
    <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
      <nav className="space-y-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? 'bg-gray-50 text-indigo-700 hover:bg-white hover:text-indigo-700'
                : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            <item.icon
              className={classNames(
                item.current
                  ? 'text-indigo-500 group-hover:text-indigo-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default SettingsSidebar
