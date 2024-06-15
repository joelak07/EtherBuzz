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
        }catch(error){
            console.log("9")
        }
    };
    useEffect(()=>{
        fetchData();
    },[])

    const get = async () =>{
        try{
            const contract=await connectingWithContract();
            console.log("11")
            const data=await contract.get();
            console.log("12")
            setNumber(data.toNumber());
            console.log("13")
            console.log(data.toNumber());
        }catch(error){
            console.log("8" + error)
        }
    }

    const set = async (value) =>{
        try{
            const contract=await connectingWithContract();
            await contract.set(value);
            get();
        }catch(error){
            console.log("10")
        }
    }

    return(
        <EtherBuzzContext.Provider value={{get,set,account,number,userName}}>
            {children}
        </EtherBuzzContext.Provider>
    )
}