import { Link, useForm, usePage } from '@inertiajs/inertia-react'
import { Checkbox, Input, Layout } from '../../components'

const Login = () => {
  const props = usePage().props
  console.log(props)
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
    remember: false,
  })

  const handleLogin = (e) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <div className="mx-auto bg-gray-50">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/register"
              className="font-medium text-gray-600 hover:text-gray-500"
            >
              create an account
            </Link>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white p-8 px-4 pb-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <Input
                label="Username"
                name="username"
                value={data.username}
                error={errors.username}
                onChange={(e) => setData('username', e.target.value)}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={data.password}
                error={errors.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              <div className="flex items-center justify-between">
                <Checkbox
                  label="Remember me"
                  name="remember"
                  value={data.remember}
                  error={errors.remember}
                  onChange={(e) =>
                    setData('remember', e.target.checked === true ? 1 : 0)
                  }
                />
                <div className="text-sm">
                  <Link
                    href="/"
                    className="font-medium text-gray-600 hover:text-gray-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className='className="flex focus:ring-offset-2" w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.layout = (page) => <Layout>{page}</Layout>

export default Login
