import "../styles/globals.css";
import 'react'
import { EtherBuzzProvider } from "../Context/EtherBuzzContext";
import {NavBar,Create,Home, PostPage} from "../Components/index";


export default function App({ Component, pageProps }) {
  return(
  <div>
    <EtherBuzzProvider>
      <NavBar />
      <Home/>
      {/* <Create /> */}
      {/* <PostPage /> */}
      <Component {...pageProps} />
    </EtherBuzzProvider>
  </div>)
}
