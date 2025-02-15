import { useAppKitAccount, useAppKitNetwork, useAppKitProvider } from "@reown/appkit/react";
import { FormInstance } from "antd";
import { ethers, isAddress } from "ethers";
import React, { MutableRefObject, useEffect, useState } from "react";
import { alchemyChains, ethereumProviderStandard } from "~/constant/constant";
import { ContractMetadata, getContractMetadata } from "~/data/contractMetadata";

function useContract({form}: { form : FormInstance }) {
    const {chainId } = useAppKitNetwork();
    const [contractInfo, setContractInfo] = useState<ContractMetadata | null>(null);
    const [balance, setBalance] = useState({
        isFetching: false,
        balance: 0,
        chainId : chainId,
    });
    const { walletProvider } = useAppKitProvider(ethereumProviderStandard);
    const { address } = useAppKitAccount();
    
     const getContractInfo = async (contractAddress : string) => {
        try {
            if (contractAddress && chainId) {
                const alchemyChain = alchemyChains[`${chainId}`];
                const contractInfo = await getContractMetadata(alchemyChain,contractAddress);
                console.log({ contractInfo });
                setContractInfo(contractInfo || null);
            }
        } catch (err) {
            console.log({ err });
        }
    }

    const handleContractInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isAddress(value)) {
            form.setFieldsValue({
                'contractAddress' : value
            })
            getContractInfo(value);
            // setContractAddress(value);
        }
    }

    const resetContractInfo = () => {
        setContractInfo(null);
        form.setFieldsValue({
            'contractAddress' : ''
        })
    }

    const getUserNativeBalance = async () => {
        try {
            setBalance((pre) => {
                return { ...pre, isFetching: true }
            })
            if (walletProvider) {
                const provider = new ethers.BrowserProvider(walletProvider);
                const balance = await provider.getBalance(address as string);
                const balanceInEther = ethers.formatEther(balance);
                setBalance((pre) => { 
                    return { ...pre, isFetching: false, balance: balanceInEther }
                }); 
            } else {
                setBalance((pre) => { 
                    return { ...pre, isFetching: false, error: "Provider is not available" }
                });
            }
        } catch (err) {
            setBalance((pre) => {
                return { ...pre, error: JSON.stringify(err) }
            })
        }
    }
   
    
    return {
        balance,
        chainId,
        contractInfo,
        setBalance,
        handleContractInput,
        resetContractInfo,
        getUserNativeBalance
    };
}

export default useContract;