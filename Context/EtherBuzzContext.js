import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckIfWalletConnected, ConnectWallet, connectingWithContract } from '../Utils/apiFeature';

export const EtherBuzzContext = React.createContext();

export const EtherBuzzProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState(0);

    const router = useRouter();

    const fetchData = async () => {
        try {
            const connectAccount = await ConnectWallet();
            setAccount(connectAccount);
        } catch (error) {
            console.log("Error in fetchData:", error);
        }
    };

    const fetchName = async (account) => {
        try {
            const contract = await connectingWithContract();
            const user = await contract.users(account);
            setName(user.username); // Extract username from user struct
        } catch (error) {
            console.log("Error in fetchName:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (account) {
            fetchName(account);
        }
    }, [account]);

    const createUser = async (username, email) => {
        try {
            const contract = await connectingWithContract();
            await contract.createUser(username, email);
        } catch (error) {
            console.log("Error in createUser:", error);
        }
    };

    return (
        <EtherBuzzContext.Provider value={{ createUser, account, number, userName, name, CheckIfWalletConnected }}>
            {children}
        </EtherBuzzContext.Provider>
    );
};
