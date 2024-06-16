import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { CheckIfWalletConnected, ConnectWallet,connectingWithContract } from '../Utils/apiFeature'


export const EtherBuzzContext=React.createContext();
export const EtherBuzzProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");  
    const [number, setNumber] = useState(0);

    const router=useRouter();
    const fetchData=async()=>{
        try{
            const contract=await connectingWithContract();
            const connectAccount=await ConnectWallet();
            setAccount(connectAccount);
            console.log(connectAccount);
        }catch(error){
            console.log("9")
        }
    };
    useEffect(()=>{
        fetchData();
    },[])

    // const get = async () =>{
    //     try{
    //         const contract=await connectingWithContract();
    //         const data=await contract.get();
    //         setNumber(data.toNumber());
    //         console.log(data.toNumber());
    //     }catch(error){
    //         console.log("8" + error)
    //     }
    // }

    // const set = async (value) =>{
    //     try{
    //         const contract=await connectingWithContract();
    //         await contract.set(value);
    //         get();
    //     }catch(error){
    //         console.log("10")
    //     }
    // }

    const createuser=async (username,email) =>{
        try{
            const contract=await connectingWithContract();
            await contract.createUser(username,email);
        }catch(error){
            console.log(error);
        }
    }

    return(
        <EtherBuzzContext.Provider value={{createuser,account,number,userName, CheckIfWalletConnected}}>
            {children}
        </EtherBuzzContext.Provider>
    )
}