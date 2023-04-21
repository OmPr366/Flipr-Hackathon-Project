import '@/styles/globals.css'
import '@/styles/Navbar.scss'
import '@/styles/podcast.scss'
import Store from '@/utils/Redux/Store';
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider store={Store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  )

}
