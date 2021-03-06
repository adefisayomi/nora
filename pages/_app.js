import Wrapper from '../src/components/wrapper/wrapper'
import GlobalStateProvider from '../src/context/globalState'
import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import { SWRConfig } from 'swr'
import axios from 'axios'
import 'keen-slider/keen-slider.min.css'


export default function App({ Component, pageProps }) {

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        refreshInterval: 0,
        fetcher: (...args) => axios(...args)
        .then(res => res?.data.data)
        .catch(err => Promise.reject(err))
      }}
    >
    <GlobalStateProvider>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </GlobalStateProvider>
  </SWRConfig>
  )
  
}

