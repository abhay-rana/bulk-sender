import { Form, FormInstance, Input, Avatar } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import useContract from '~/hooks/useContract';
import React, { useEffect } from 'react';
import { defaultAvtar, evmChainsLogos } from '~/constant/constant';
import WarningContractStandardModal from '../modals/wrong-contract-warning-modal';

interface ContractAddressBarProps {
    form: FormInstance;
    standard: string;
    setStandard: React.Dispatch<React.SetStateAction<string>>;
}
function ContractAddressBar({
    form,
    standard,
    setStandard,
}: ContractAddressBarProps) {
    const {
        handleContractInput,
        resetContractInfo,
        warning,
        contractInfo,
        balance,
        chainId,
    } = useContract({ form, standard, setStandard });

   

    return (
        <div className="flex flex-col gap-6">
            {contractInfo == null ? (
                standard !== 'NATIVE' ? (
                    <Form layout="vertical" className="w-full" form={form}>
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
                                value={form.getFieldValue('contractAddress')}
                                onChange={handleContractInput}
                            />
                        </Form.Item>
                    </Form>
                ) : (
                    <div className="flex h-[50px] items-center justify-between rounded-lg p-4">
                        <div className="flex items-center gap-4">
                            <Avatar
                                size={40}
                                src={evmChainsLogos[chainId] || defaultAvtar}
                                style={{
                                    objectFit: 'fill',
                                    padding: 10,
                                }}
                            />
                            <p className="text-balck text-16 font-medium">
                                {balance?.isFetching
                                    ? 'Loading...'
                                    : balance?.balance}
                            </p>
                        </div>
                        <CloseCircleOutlined
                            className="text-xl cursor-pointer text-white hover:text-red-700"
                            onClick={resetContractInfo}
                        />
                    </div>
                )
            ) : (
                <div className="flex h-[50px] items-center justify-between rounded-lg bg-blue-500 p-4">
                    <div className="flex items-center gap-4">
                        <Avatar
                            size={40}
                            src={
                                contractInfo?.openSeaMetadata?.imageUrl ||
                                defaultAvtar
                            }
                        />
                        <p className="text-16 font-medium text-white">
                            {contractInfo?.symbol ||
                                contractInfo?.name ||
                                contractInfo?.openSeaMetadata?.collectionName ||
                                'UNKNOWN'}
                        </p>
                    </div>
                    <CloseCircleOutlined
                        className="text-xl cursor-pointer text-white hover:text-red-700"
                        onClick={resetContractInfo}
                    />
                </div>
            )}

            <WarningContractStandardModal open={warning.open} text={warning.text} handleOkBtn={warning.handleOnChangeClick} handleCancelBtn={warning.handleOnChangeIgnore} />
        </div>
    );
}

export default ContractAddressBar;
