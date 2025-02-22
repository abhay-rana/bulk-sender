import { Button, Form, Input, Select } from 'antd';
import useTransactionBundler from '~/hooks/useTransactionBundler';

function multitransactionBundler() {    
    const { handleContractSection, contractAbi, handleSelectedFunction, selectedFunctions } = useTransactionBundler();
    return ( 
        <div className="w-[100%] h-[100%]">
            <h2 className='text-center'>Multi Transaction Bundler</h2>
            <p className='text-center'>Create different type of transactions.</p>

            <div className='w-[100%] flex justify-center items-center'>
                <div className='w-[400px] mt-[100px]'>
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
                        />
                    </Form.Item>

                   <Form.Item
                        label={
                            <span className="text-16 font-medium">
                                ABI
                            </span>
                        }
                        name="contractAddress"
                        className="[&_.ant-form-item-label>label]:text-gray-700"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a contract address!',
                            },
                        ]}
                        >                   
                        <Select
                            placeholder="Select your contract address"
                            size="large"
                            className="rounded-lg"
                            options={contractAbi?.options}
                            onChange={handleSelectedFunction}
                        />
                    </Form.Item>


                    {
                        selectedFunctions?.inputs?.map((item, index) => {
                            return (
                                <Form.Item
                                    key={index}
                                    label={
                                        <span className="text-16 font-medium">
                                            {item?.name}
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
                                        placeholder={ item.name}
                                        size="large"
                                        className="rounded-lg"
                                    />
                                </Form.Item>
                            )
                        })
                    }
                    
                    <Button
                        type="primary"
                        size="large"
                        className="w-[100%] rounded-lg"
                        onClick={() => {
                            handleContractSection("0xdAC17F958D2ee523a2206206994597C13D831ec7")
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
     );
}

export default multitransactionBundler;