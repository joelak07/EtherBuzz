import "../styles/globals.css";
import 'react'
import { EtherBuzzProvider } from "../Context/EtherBuzzContext";
import {NavBar,Create,Home, PostPage} from "../Components/index";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div>
      <EtherBuzzProvider>
        <NavBar />
        {router.pathname === '/' && <Home />}
        {router.pathname === '/create'}
        {router.pathname === '/postpage'}
        <Component {...pageProps} />
      </EtherBuzzProvider>
    </div>
  );
}
