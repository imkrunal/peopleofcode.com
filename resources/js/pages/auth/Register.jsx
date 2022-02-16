import { Link, useForm } from '@inertiajs/inertia-react'
import { Input, Layout } from '../../components'

const Register = () => {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    email: '',
    password: '',
  })

  const handleRegister = (e) => {
    e.preventDefault()
    post('/register')
  }

  return (
    <div className="mx-auto bg-gray-50">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/login"
              className="font-medium text-gray-600 hover:text-gray-500"
            >
              sign in to your account
            </Link>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white p-8 px-4 pb-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleRegister}>
              <Input
                label="Username"
                name="username"
                value={data.username}
                error={errors.username}
                onChange={(e) => setData('username', e.target.value)}
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={data.email}
                error={errors.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={data.password}
                error={errors.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              <div>
                <button
                  type="submit"
                  className='className="flex focus:ring-offset-2" w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Register.layout = (page) => <Layout>{page}</Layout>

export default Register
