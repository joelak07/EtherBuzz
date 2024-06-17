import React from 'react';
import { useContext } from 'react';
import { EtherBuzzContext } from '../../Context/EtherBuzzContext';
import styles from './Create.module.css'; // Assuming you have a CSS module for styling

const Create = () => {
    const { createUser, account } = useContext(EtherBuzzContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        // Handle the form submission logic here
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Wallet Address:', account);
        createUser(name,email);
    };  

    

    return (
        <div className={styles.createContainer}>
            <div className={styles.box}>
                <h1 className={styles.head}>Create your profile</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="walletAddress" className={styles.label}>Wallet Address:</label>
                        <input type="text" id="walletAddress" name="walletAddress" className={`${styles.input} ${styles.readOnly}`} value={account} readOnly />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Name:</label>
                        <input type="text" id="name" name="name" className={styles.input} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email:</label>
                        <input type="email" id="email" name="email" className={styles.input} required />
                    </div>
                    <button type="submit" className={styles.submitButton}>Create Account</button>
                </form>
            </div>

        </div>
    );
};

export default Create;
