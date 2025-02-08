import { Button, Form, Input } from 'antd';
import { useRef, useState } from 'react';
import TextAreaWithDragDrop from '~/components/common/textarea';
import NewTextArea from '~/components/common/new-textarea';
import ValidateAddressModal from '~/components/modals/validate-address-modal';

const BulkSenderScreen = () => {
    const [form] = Form.useForm();
    const [validateAddressesModal, setValidateAddressesModal] =
        useState<boolean>(false);
    const [selectedStandard, setSelectedStandard] = useState<string>('');

    const textAreaRef = useRef<{
        setText: (text: string) => void;
        text: string;
    } | null>(null);

    const handleStandardSelect = (standard: string) => {
        setSelectedStandard(standard);
    };

    const handleReset = () => {
        // Reset form fields
        form.resetFields();
        // Reset textarea
        textAreaRef.current?.setText('');
        // Reset standard button
        setSelectedStandard('');
    };

    function toggleValidateAddressesModal(state: boolean) {
        setValidateAddressesModal(state);
    }

    return (
        <div className="mx-auto max-w-4xl px-6 py-12">
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col gap-3 text-center">
                    <h1 className="text-32 font-bold text-gray-800">
                        Welcome To Bulk Sender
                    </h1>
                    <h3 className="text-18 text-gray-600">
                        A tool that allows you to send your NFT, Token and
                        Native currency to multiple receipients.
                    </h3>
                </div>

                {/* Standards Selection */}
                <div className="mt-4 flex flex-col gap-4">
                    <h2 className="text-20 font-semibold text-gray-700">
                        Select Standards:
                    </h2>
                    <div className="flex flex-row gap-4">
                        <Button
                            type={
                                selectedStandard === 'ERC20'
                                    ? 'primary'
                                    : 'default'
                            }
                            size="large"
                            className="min-w-[120px] hover:border-blue-500 hover:text-blue-500"
                            onClick={() => handleStandardSelect('ERC20')}
                        >
                            ERC20
                        </Button>
                        <Button
                            type={
                                selectedStandard === 'ERC721'
                                    ? 'primary'
                                    : 'default'
                            }
                            size="large"
                            className="min-w-[120px] hover:border-blue-500 hover:text-blue-500"
                            onClick={() => handleStandardSelect('ERC721')}
                        >
                            ERC721
                        </Button>
                        <Button
                            type={
                                selectedStandard === 'ERC1155'
                                    ? 'primary'
                                    : 'default'
                            }
                            size="large"
                            className="min-w-[120px] hover:border-blue-500 hover:text-blue-500"
                            onClick={() => handleStandardSelect('ERC1155')}
                        >
                            ERC1155
                        </Button>
                        <Button
                            type={
                                selectedStandard === 'Native'
                                    ? 'primary'
                                    : 'default'
                            }
                            size="large"
                            className="min-w-[120px] hover:border-blue-500 hover:text-blue-500"
                            onClick={() => handleStandardSelect('Native')}
                        >
                            Native
                        </Button>
                    </div>
                </div>

                {/* Form Section */}
                <div className="flex flex-col gap-6">
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
                            />
                        </Form.Item>
                    </Form>
                    {/* <TextAreaWithDragDrop ref={textAreaRef} /> */}
                    <NewTextArea ref={textAreaRef} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row justify-end gap-4 pt-4">
                    <Button
                        danger
                        size="large"
                        className="min-w-[100px]"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        className="min-w-[100px] bg-blue-500 hover:bg-blue-600"
                        onClick={() => toggleValidateAddressesModal(true)}
                    >
                        Continue
                    </Button>
                </div>
            </div>

            <ValidateAddressModal
                isOpen={validateAddressesModal}
                onClose={() => toggleValidateAddressesModal(false)}
                selectedTokenType={selectedStandard}
                textAreaRef={textAreaRef}
            />
        </div>
    );
};

export default BulkSenderScreen;
