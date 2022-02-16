import PropTypes from 'prop-types'
import Footer from './Footer'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  return (
    <div>
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
