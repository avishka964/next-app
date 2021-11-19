import Layout from '../components/layout/Layout';
import '../styles/globals.css'

function _app({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}

export default _app
