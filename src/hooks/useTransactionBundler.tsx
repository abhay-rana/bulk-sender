import { ethers } from "ethers";
import { useState } from "react";
import { getContractABI } from "~/data/multTransactionBundler";

const useTransactionBundler = () => {

    // const [contractAddress, setContractAddress] = useState();

    const [contractAbi, setContractAbi] = useState({data : [], options : []});
    const [selectedFunctions, setSelectedFunctions] = useState({data : [], options : []});

    const handleContractSection = async (contractAddress: string) => {
        try {
            if (ethers.isAddress(contractAddress)) {
                const data = await getContractABI(contractAddress);
                console.log({ data });

                const options = data?.map((item, index: number) => {
                    return {
                        label: item.name,
                        value: index
                    }
                })

                setContractAbi({data : data, options : options});
            } else new Error('Invalid contract address');
        } catch (err) {
            console.log({err})
        }
    }

    const handleSelectedFunction = (value : number) => {
        setSelectedFunctions(contractAbi.data[value])
    }

    return {contractAbi, selectedFunctions, handleContractSection, handleSelectedFunction};
};

export default useTransactionBundler;