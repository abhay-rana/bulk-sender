import { Form, FormInstance, Input, Avatar } from 'antd';
import { CloseCircleOutlined } from "@ant-design/icons";
import useContract from '~/hooks/useContract';
import React, { useEffect } from 'react';
import { defaultAvtar, evmChainsLogos } from '~/constant/constant';


interface ContractAddressBarProps {
    form: FormInstance,
    standard: string,
    setStandard: React.Dispatch<React.SetStateAction<string>>
}
function ContractAddressBar({ form,  standard, setStandard}: ContractAddressBarProps) {
    const { handleContractInput, resetContractInfo, getUserNativeBalance, contractInfo, balance, chainId } = useContract({form});


    useEffect(() => {
        // if stanard id not supported 
        const contractStandard = (contractInfo?.tokenType === "NO_SUPPORTED_NFT_STANDARD") ? "ERC20" : contractInfo?.tokenType;
        const isContract = contractInfo?.tokenType === "NOT_A_CONTRACT" ? false : true;

        if (contractStandard !== standard && contractInfo !== null && standard !== '' && isContract && standard !== "NATIVE") {
            const askForStandardChange = window.confirm(
                `You have selected ${standard} standard but the token type is ${contractStandard}. Do you want to change it to ${contractStandard} standard?`
            )

            if (!askForStandardChange) resetContractInfo();
            else setStandard(contractStandard || standard);
            
        } else if (!isContract && contractStandard === "NOT_A_CONTRACT") {
            alert('Please make sure you have selected the correct chain or contract address');
            resetContractInfo();
        } 


        // only when the NATIVE TOKEN SELECTED
        if (standard === "NATIVE") {
            getUserNativeBalance();
        }

    }, [contractInfo, standard, chainId])

    return ( 
         <div className="flex flex-col gap-6">
            {contractInfo == null ?
                    (standard !== "NATIVE") ? <Form layout="vertical" className="w-full" form={form}>
                        <Form.Item
                            label={
                                <span className="text-16 font-medium">
                                    Token/ NFT/ Contract Address
                                </span>
                            }
                            name="contractAddress"
                            className="[&_.ant-form-item-label>label]:text-gray-700"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input contract address!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter your contract address"
                                size="large"
                                className="rounded-lg"
                                value={form.getFieldValue("contractAddress")}
                                onChange={handleContractInput}
                            />
                        </Form.Item>
                </Form> : 
                    <div className=" h-[50px] flex justify-between items-center p-4 rounded-lg">
                        <div className='flex items-center gap-4'>
                            <Avatar size={40} src={evmChainsLogos[chainId] || defaultAvtar} style={{
                                objectFit: 'fill',
                                padding : 10,
                            }} />
                            <p className="text-16 font-medium text-balck">{balance?.isFetching ? "Loading..." : balance?.balance}</p>
                        </div>
                          <CloseCircleOutlined
                            className="text-white text-xl cursor-pointer hover:text-red-700"
                            onClick={resetContractInfo}
                          />
                    </div>
                
                : 
                    <div className=" h-[50px] flex justify-between items-center bg-blue-500 p-4 rounded-lg">
                        <div className='flex items-center gap-4'>
                            <Avatar size={40} src={contractInfo?.openSeaMetadata?.imageUrl || defaultAvtar} />
                            <p className="text-16 font-medium text-white">{contractInfo?.symbol || contractInfo?.name || contractInfo?.openSeaMetadata?.collectionName || "UNKNOWN"}</p>
                        </div>
                          <CloseCircleOutlined
                            className="text-white text-xl cursor-pointer hover:text-red-700"
                            onClick={resetContractInfo}
                          />
                    </div>
            }
            </div>   
     );
}

export default ContractAddressBar;