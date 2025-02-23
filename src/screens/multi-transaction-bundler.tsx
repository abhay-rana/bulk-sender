import { Button, Form, Input, Select } from 'antd';
import useTransactionBundler from '~/hooks/useTransactionBundler';

function multitransactionBundler() {    
      const [form] = Form.useForm();
      const { handleSubmit, contractAbi, handleSelectedFunction, selectedFunctions, handleContractAddressInput } = useTransactionBundler({ form });
    
    return ( 
        <div className="w-[100%] h-[100%]">
            <h2 className='text-center'>Multi Transaction Bundler</h2>
            <p className='text-center'>Create different type of transactions.</p>

            <div className='w-[100%] flex justify-center items-center'>
                <div className='w-[400px] mt-[100px]'>
                    <Form form={form} layout='vertical'>
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
                            value={form.getFieldValue('contractAddress')}
                            onChange={handleContractAddressInput}
                            className="rounded-lg"
                        />
                        </Form.Item>

                        {contractAbi?.options?.length > 0 && <Form.Item
                        label={
                            <span className="text-16 font-medium">
                                ABI
                            </span>
                        }
                        name="option"
                        className="[&_.ant-form-item-label>label]:text-gray-700"
                        rules={[
                            {
                                required: true,
                                message: 'Please select contract function!',
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
                        </Form.Item>}


                        {
                            selectedFunctions?.inputs?.map((item: {name : string, type : string}, index : number) => {
                            return (
                                <Form.Item
                                    key={index}
                                    label={
                                        <span className="text-16 font-medium">
                                            {item?.name}
                                        </span>
                                    }
                                    name={item.name || "unkown" + index}
                                    className="[&_.ant-form-item-label>label]:text-gray-700"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input contract address!',
                                        },
                                    ]}
                                    >
                                    <Input
                                        placeholder={item.type}
                                        size="large"
                                        className="rounded-lg"
                                    />
                                </Form.Item>
                            )
                            })
                        }

                           {(selectedFunctions?.stateMutability === 'payable') &&  <Form.Item
                                label={
                                    <span className="text-16 font-medium">
                                        {"value"}
                                    </span>
                                }
                                name={"value"}
                                className="[&_.ant-form-item-label>label]:text-gray-700"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input contract address!',
                                    },
                                ]}
                                >
                                <Input
                                    placeholder={"uint256"}
                                    size="large"
                                    className="rounded-lg"
                                />
                            </Form.Item>
                        }


                        <Button
                        type="primary"
                        size="large"
                        className="w-[100%] rounded-lg"
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                        Submit
                    </Button>
                </Form>
                </div>
            </div>
        </div>
     );
}

export default multitransactionBundler;