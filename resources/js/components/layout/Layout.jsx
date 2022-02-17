import PropTypes from 'prop-types'
import Footer from './Footer'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
