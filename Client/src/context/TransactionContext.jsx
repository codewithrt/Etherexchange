import React,{createContext, useEffect,useState} from 'react'
import { ethers } from 'ethers'
import { contractABI,contractAddress } from '../utils/Constant';
// import { useState } from 'react';

export const TransactionContext =createContext();

const {ethereum} = window;





const getEthereumContract = () =>{
    const provider  = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer)
    console.log(
        provider,
        signer,
        transactionContract
    );
    return(
        {transactionContract,signer,provider}
    )
}

const TransactionProvider = (children) =>{
    const [CurrentAccount, setCurrentAccount] = useState('')
    const [formData , setformData] = useState({addressTo:'', amount :'',keyword:'',message:''})
    const [loading, setloading] = useState(false)
    const [Transaction, setTransaction] = useState([])
    const [TransactionCount, setTransactionCount] = useState(window.localStorage.getItem("transactionCount"))



const handleOnchange = (e,name)=>{
      setformData((prevState) => ({...prevState,[name]:e.target.value}))
    }

const checkIfTransactionsExists = async () => {
        try {
          if (ethereum) {
            const transactionsContract = createEthereumContract();
            const currentTransactionCount = await transactionsContract.getTransactionCount();
    
            window.localStorage.setItem("transactionCount", currentTransactionCount);
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

const getAllTransaction = async ()=>{
    try {
        if (ethereum) {
          const {transactionContract} = getEthereumContract();
              console.log(transactionContract);
          const availableTransactions = await  transactionContract.getAllTransaction();
          console.log(availableTransactions);
  
          const structuredTransactions = availableTransactions.map((transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / (10 ** 18)
          }));
  
          console.log(structuredTransactions);
  
          setTransaction(structuredTransactions);
        } else {
          console.log("Ethereum is not present");
        }
      } catch (error) {
        console.log(error);
      }
   
  
}

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert('Please install metamask')
            }
    
        const accounts = await ethereum.request({method:'eth_accounts'});
    
        console.log(accounts);
        if(accounts.length){
            setCurrentAccount(accounts[0])
            getAllTransaction();
        }
        else {
            console.log('no ethreum accounts');
        }
        } catch (error) {
            console.log(error);
        }
      
}

const Sendtransaction = async() =>{
    try {
        if (!ethereum) {
            return alert('Please install metamask')}
        // get data from form
        const {addressTo , amount ,keyword,message} = formData;
        const {transactionContract} = getEthereumContract();
        console.log(transactionContract);
        const parsedAmount = ethers.utils.parseEther(amount)
        console.log(parsedAmount._hex);

        await ethereum.request({
            method:'eth_sendTransaction',
            params:[{
                from : CurrentAccount,
                to: addressTo,
                value : parsedAmount._hex,
                gas:'0x5208'
            }]
        })
            console.log('before hash')
         const transactionhash = await transactionContract.addtoBlockchain(addressTo , parsedAmount,message ,keyword)
         console.log('first hash code');
         setloading(true);
         console.log(`Loading - ${transactionhash.hash}`);
         await transactionhash.wait();
        setloading(false)
        console.log(`Success - ${transactionhash.hash}`);
        
        const transactionsCount = await transactionContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
        }
        
     catch (error) {
        
    }
}


const connectWallet = async() =>{
    try {
        if (!ethereum) {
            return alert('Please install metamask')
        }

    const accounts = await ethereum.request({method:'eth_requestAccounts'});
    console.log(accounts);
    setCurrentAccount(accounts[0])

    } catch (error) {
        console.log(error);
        throw new Error('No Ethereum Object.')
    }
}

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists()
    }, [TransactionCount])

    return(
    <TransactionContext.Provider value={{ connectWallet ,CurrentAccount,handleOnchange,formData,Sendtransaction,Transaction,loading}} {...children}/>
    )
}

export {TransactionProvider};
// export {TransactionContext}
