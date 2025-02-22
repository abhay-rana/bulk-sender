import { useAppKitProvider } from "@reown/appkit/react";
import { FormInstance } from "antd";
import { ethers, isAddress } from "ethers";
import React, { useState } from "react";
import { evmProviderStandard } from "~/constant/constant";
import { getContractABI } from "~/data/multTransactionBundler";
import { createFunctionSignature } from "~/services/ethers-services";

const useTransactionBundler = ({ form }: {form : FormInstance}) => {
    // const [contractAddress, setContractAddress] = useState<string | Address>();
    const { walletProvider } = useAppKitProvider(evmProviderStandard);

    const [contractAbi, setContractAbi] = useState({data : [], options : []});
    const [selectedFunctions, setSelectedFunctions] = useState({data : [], options : []});

    const handleContractSection = async (contractAddress: string) => {
        try {
            if (ethers.isAddress(contractAddress)) {
                const data = await getContractABI(contractAddress);
                console.log({ data });

                const options = data?.reduce((acc, item, index) => {
                  if (item?.type === 'function' && (item?.stateMutability === 'nonpayable' || item?.stateMutability === 'payable')) {
    acc.push({
      label: item.name,
      value: index,
    });
                  }
                  return acc;
                }, []);

                setContractAbi({data : data, options : options});
            } else new Error('Invalid contract address');
        } catch (err) {
            console.log({err})
        }
    }

    const handleContractAddressInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const address = e.target.value;
        if (isAddress(address)) {
            handleContractSection(address);
        }
    }

    const handleSelectedFunction = (value : number) => {
        setSelectedFunctions(contractAbi.data[value])
    }

    const handleSubmit = async () => {
        try {
            const provider = new ethers.BrowserProvider(walletProvider);
            if (selectedFunctions && provider) {
                const contractAddress = form.getFieldValue('contractAddress');
                const args = selectedFunctions?.inputs?.map((item : { name : string, type : string }, index : number) => {
                    return form.getFieldValue(item.name || "unkown" + index);
                })
                const data = await createFunctionSignature(provider, contractAddress, [selectedFunctions], selectedFunctions.name, args, 0)
                console.log({data})
            } else {
                throw new Error('Invalid contract address Or wallet not connect properly');
            }
        } catch (err) {
            console.log({ err });
            alert(JSON.stringify(err));
        }
    }

    return {contractAbi, selectedFunctions,handleContractAddressInput, handleContractSection, handleSelectedFunction, handleSubmit};
};

export default useTransactionBundler;