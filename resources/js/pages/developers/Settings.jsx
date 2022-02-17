import { useForm, usePage } from '@inertiajs/inertia-react'
import { pick } from 'lodash'
import {
  DragDropUpload,
  ImageUpload,
  Input,
  Layout,
  Textarea,
} from '../../components'
import SettingsSidebar from './SettingsSidebar'

const Settings = () => {
  const { basicInformation } = usePage().props
  const { data, setData, post, processing, errors } = useForm(
    pick(basicInformation, [
      'first_name',
      'last_name',
      'bio',
      'website',
      'github',
      'twitter',
      'linkedin',
    ]) || {
      first_name: '',
      last_name: '',
      avatar: '',
      cover: '',
      bio: '',
      website: '',
      github: '',
      twitter: '',
      linkedin: '',
    },
  )

  const handleBasicInfoUpdate = (e) => {
    e.preventDefault()
    console.log(data)
    post('/developers/update-basic-information', { forceFormData: true })
  }

  console.log(basicInformation)

  return (
    <div className="mx-auto max-w-7xl  px-16 py-8">
      <h1 className="mb-8 text-2xl font-medium text-gray-700">
        Update Settings
      </h1>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <SettingsSidebar />
        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
          <form onSubmit={handleBasicInfoUpdate}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Basic Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <Input
                    className="col-span-6 sm:col-span-3"
                    label="First Name"
                    name="first_name"
                    value={data.first_name}
                    error={errors.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                  />
                  <Input
                    className="col-span-6 sm:col-span-3"
                    label="Last Name"
                    name="last_name"
                    value={data.last_name}
                    error={errors.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                  />
                  <Textarea
                    className="col-span-6"
                    label="Bio"
                    name="bio"
                    rows={5}
                    value={data.bio}
                    error={errors.bio}
                    onChange={(e) => setData('bio', e.target.value)}
                  />
                  <ImageUpload
                    label="Avatar"
                    name="avatar"
                    value={data.avatar}
                    error={errors.avatar}
                    defaultValue={`/storage/avatars/${basicInformation.avatar}`}
                    onChange={(e) => setData('avatar', e.target.files[0])}
                    className="col-span-6"
                    previewClasses="inline-block h-24 w-24 overflow-hidden rounded-full bg-gray-100"
                  />
                  <DragDropUpload
                    label="Cover"
                    name="cover"
                    value={data.cover}
                    error={errors.cover}
                    defaultValue={`/storage/covers/${basicInformation.cover}`}
                    onChange={(e) => setData('cover', e.target.files[0])}
                    className="col-span-6"
                    accept="image/*"
                  />
                  <Input
                    className="col-span-6 sm:col-span-3"
                    label="Website"
                    name="website"
                    value={data.website}
                    error={errors.website}
                    onChange={(e) => setData('website', e.target.value)}
                  />
                  <Input
                    className="col-span-6 sm:col-span-3"
                    label="Github"
                    name="github"
                    addOn="github.com/"
                    value={data.github}
                    error={errors.github}
                    onChange={(e) => setData('github', e.target.value)}
                  />
                  <Input
                    className="col-span-6 sm:col-span-3"
                    label="Twitter"
                    name="twitter"
                    addOn="twitter.com/"
                    value={data.twitter}
                    error={errors.twitter}
                    onChange={(e) => setData('twitter', e.target.value)}
                  />
                  <Input
                    className="col-span-6 sm:col-span-3"
                    label="Linkedin"
                    name="linkedin"
                    addOn="linkedin.com/in/"
                    value={data.linkedin}
                    error={errors.linkedin}
                    onChange={(e) => setData('linkedin', e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {processing ? 'Loading...' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

Settings.layout = (page) => <Layout>{page}</Layout>

export default Settings
