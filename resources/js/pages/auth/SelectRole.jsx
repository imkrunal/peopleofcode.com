import {
  ArrowRightIcon,
  BriefcaseIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-react'
import { Layout } from '../../components'

const SelectRole = () => {
  const { appName } = usePage().props

  const handleRoleSelect = (role) => Inertia.post('/update-role', { role })

  return (
    <div className="my-16 max-w-6xl lg:mx-auto">
      <h1 className="text-3xl font-bold leading-tight text-gray-900">
        What brings you to {appName}?
      </h1>
      <div className="mt-8 sm:grid sm:grid-cols-2 sm:gap-8">
        <div
          className="group relative cursor-pointer bg-white p-6 shadow focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500 sm:rounded-lg sm:hover:shadow-lg"
          onClick={() => handleRoleSelect('Developer')}
        >
          <div>
            <span className="inline-flex rounded bg-gray-100 p-3 text-gray-700 ring-4 ring-white">
              <BriefcaseIcon className="h-6 w-6" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium">I&apos;m looking for work</h3>
            <p>You&apos;re a developer looking for your next gig.</p>
          </div>
          <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400">
            <ArrowRightIcon className="h-6 w-6" />
          </span>
        </div>
        <div
          className="group relative cursor-pointer bg-white p-6 shadow focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500 sm:rounded-lg sm:hover:shadow-lg"
          onClick={() => handleRoleSelect('Agency')}
        >
          <div>
            <span className="inline-flex rounded bg-gray-100 p-3 text-gray-700 ring-4 ring-white">
              <UsersIcon className="h-6 w-6" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium">I&apos;m hiring developers</h3>
            <p>
              You&apos;re a business looking to hire a freelance, part-time, or
              full-time developer.
            </p>
          </div>
          <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400">
            <ArrowRightIcon className="h-6 w-6" />
          </span>
        </div>
      </div>
    </div>
  )
}

SelectRole.layout = (page) => <Layout>{page}</Layout>

export default SelectRole
