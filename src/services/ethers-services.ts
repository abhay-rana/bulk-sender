import { Provider, Contract } from "ethers";

// create function signature for bundling
export const createFunctionSignature = (provider: Provider, ContractAddress: string, Abi: Array, functionName:string, args: Array, value:number) => {
    const contract = new Contract(ContractAddress, Abi, provider);              
    const data = contract.interface.encodeFunctionData(functionName, args);
    return {
        to: ContractAddress,
        data: data,
        value : value,
    };
};

