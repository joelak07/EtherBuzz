import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckIfWalletConnected, ConnectWallet, connectingWithContract } from '../Utils/apiFeature';
export const EtherBuzzContext = React.createContext();

export const EtherBuzzProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState(0);
    const { ethers } = require("ethers");

    const router = useRouter();

    const fetchData = async () => {
        try {
            const connectAccount = await ConnectWallet();
            setAccount(connectAccount);
        } catch (error) {
            console.log("Error in fetchData:", error);
        }
    };

    const submitPost = async (title, content) => {
        try {
            const contract = await connectingWithContract();
            const gasLimit = ethers.BigNumber.from("500000"); 
            const tx = await contract.createPost(content, title, { gasLimit });
            await tx.wait();
    
            console.log("Post submitted successfully:", tx);
        } catch (error) {
            console.log("Error in submitPost:", error);
        }
    };

    const fetchPosts = async () => {
        try {
            const contract = await connectingWithContract();
            const posts = await contract.getAllPosts();
            console.log("Posts:", posts);
        } catch (error) {
            console.log("Error in fetchPosts:", error);
        }
    }
    
    

    const fetchName = async (account) => {
        try {
            const contract = await connectingWithContract();
            const user = await contract.users(account);
            setName(user.username); 
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
        <EtherBuzzContext.Provider value={{ fetchPosts, submitPost, createUser, account, number, userName, name, CheckIfWalletConnected }}>
            {children}
        </EtherBuzzContext.Provider>
    );
};
