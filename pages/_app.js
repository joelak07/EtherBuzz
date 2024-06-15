import "../styles/globals.css";
import 'react'
import { EtherBuzzProvider } from "../Context/EtherBuzzContext";
import {NavBar} from "../Components/index";

export default function App({ Component, pageProps }) {
  return(
  <div>
    <EtherBuzzProvider>
      <NavBar />
      <Component {...pageProps} />
    </EtherBuzzProvider>
  </div>)
}
