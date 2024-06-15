import React, { useState, useEffect, useContext } from "react";
import { EtherBuzzContext } from "../../Context/EtherBuzzContext";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { account, CheckIfWalletConnected } = useContext(EtherBuzzContext);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const checkWalletConnection = async () => {
      const connected = await CheckIfWalletConnected();
      if (connected) {
        setWalletAddress(account);
      }
    };

    checkWalletConnection();
  }, [CheckIfWalletConnected, account]);

  return (
    <div className={styles.navbarmain}>
      <div className={styles.navbarleft}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>EtherBuzz</h1>
        </div>
      </div>
      <div className={styles.navbarright}>
        <button className={styles.navbarbutton}>Post</button>
        <button className={styles.navbarbutton}>
          {walletAddress ? walletAddress : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
