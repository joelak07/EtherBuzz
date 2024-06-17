import React, { useState, useEffect, useContext } from "react";
import { EtherBuzzContext } from "../../Context/EtherBuzzContext";
import styles from "./NavBar.module.css";
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar = () => {
  const { account, CheckIfWalletConnected } = useContext(EtherBuzzContext);
  const [walletAddress, setWalletAddress] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkWalletConnection = async () => {
      const connected = await CheckIfWalletConnected();
      if (connected) {
        setWalletAddress(account);
      }
    };

    checkWalletConnection();
  }, [CheckIfWalletConnected, account]);

  const handlePostClick = () => {
    router.push('/postpage');
  };

  return (
    <div className={styles.navbarmain}>
      <div className={styles.navbarleft}>
        <div className={styles.titlebox}>
          <Link href="/">
            <a className={styles.title}>
              Ether<span style={{ color: "goldenrod" }}>Buzz</span>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.navbarright}>
        <button className={styles.navbarbutton} onClick={handlePostClick}>Post</button>
        <button className={styles.navbarbutton}>
          {walletAddress ? walletAddress : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
