import { useAppKitAccount, useAppKitNetwork, useAppKitProvider } from "@reown/appkit/react";
import { FormInstance } from "antd";
import { ethers, isAddress } from "ethers";
import React, { useEffect, useState } from "react";
import { alchemyChains, evmProviderStandard } from "~/constants/blockchain-metdata";
import { ContractMetadata, getContractMetadata } from "~/data/contractMetadata";

function useContract({form, standard, setStandard}: { form : FormInstance, standard : string, setStandard : React.Dispatch<React.SetStateAction<string>> }) {
    const {chainId } = useAppKitNetwork();
    const [contractInfo, setContractInfo] = useState<ContractMetadata | null>(null);
    const [balance, setBalance] = useState({
        isFetching: false,
        balance: 0,
        chainId : chainId,
    });
    const { walletProvider } = useAppKitProvider(evmProviderStandard);
    const { address } = useAppKitAccount();
    const [warning, setWarning] = useState({
        open: false,
        text: '',
        handleOnChangeClick: () => { },
        handleOnChangeIgnore:() => { },
    });
    
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

     useEffect(() => {
        // if stanard id not supported
        const contractStandard =
            contractInfo?.tokenType === 'NO_SUPPORTED_NFT_STANDARD'
                ? 'ERC20'
                : contractInfo?.tokenType;
        const isContract =
            contractInfo?.tokenType === 'NOT_A_CONTRACT' ? false : true;

        if (
            contractStandard !== standard &&
            contractInfo !== null &&
            standard !== '' &&
            isContract &&
            standard !== 'NATIVE'
        ) {
            const askForStandardChange = `You have selected ${standard} standard but the token type is ${contractStandard}. Do you want to change it to ${contractStandard} standard?`
            setWarning({
                open: true,
                text: askForStandardChange,
                handleOnChangeClick: () => {
                    setStandard(contractStandard || standard);
                    setWarning((pre) => {
                        pre.open = false;
                        return pre
                    })
                },
                handleOnChangeIgnore: () => {
                    resetContractInfo();
                    setWarning((pre) => {
                        pre.open = false;
                        return pre
                    })
                }
            })
            
            // const askForStandardChange = window.confirm(
            //     `You have selected ${standard} standard but the token type is ${contractStandard}. Do you want to change it to ${contractStandard} standard?`
            // );
            // setModalState(true)
            // if (!askForStandardChange) resetContractInfo();
            // else setStandard(contractStandard || standard);
        } else if (!isContract && contractStandard === 'NOT_A_CONTRACT') {
            alert(
                'Please make sure you have selected the correct chain or contract address'
            );
            resetContractInfo();
        }

        // only when the NATIVE TOKEN SELECTED
        if (standard === 'NATIVE') {
            getUserNativeBalance();
        }
    }, [contractInfo, standard, chainId]);
   
    
    return {
        balance,
        chainId,
        contractInfo,
        warning,
        setBalance,
        handleContractInput,
        resetContractInfo,
        getUserNativeBalance
    };
}

export default useContract;