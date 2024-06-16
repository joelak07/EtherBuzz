import "../styles/globals.css";
import 'react'
import { EtherBuzzProvider } from "../Context/EtherBuzzContext";
import {NavBar,Create,Home} from "../Components/index";


export default function App({ Component, pageProps }) {
  return(
  <div>
    <EtherBuzzProvider>
      <NavBar />
      <Home/>
      <Component {...pageProps} />
    </EtherBuzzProvider>
  </div>)
}
