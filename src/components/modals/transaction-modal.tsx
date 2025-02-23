import React, { useEffect } from 'react';
import { Modal, Typography, Badge, Button, Space, message } from 'antd';
import { CopyOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import animationData from '~/assets/lottie/status-lottie.json'; // Your Lottie JSON file
import Lottie from 'lottie-react';

const { Text, Title } = Typography;

interface TransactionModalProps {
    status: 'pending' | 'completed' | 'failed';
    paymentAmount: string;
    totalAmount: string;
    reference: string;
    transactionHash: string;
    onBackClick: () => void;
}

// Define segment ranges for different states
const stateFrames = {
    pending: [0, 185], // Adjust based on your Lottie file's frames
    failed: [320, 360],
    completed: [185, 240],
};

const TransactionModal: React.FC<TransactionModalProps> = ({
    status,
    paymentAmount,
    totalAmount,
    reference,
    transactionHash,
    onBackClick,
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'processing';
            case 'completed':
                return 'success';
            case 'failed':
                return 'error';
            default:
                return 'default';
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        message.success('Copied to clipboard');
    };

    const lottieRef = React.useRef(null);

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.playSegments(stateFrames[status], true);
        }
    }, [status]);

    return (
        <Modal
            open={true}
            footer={null}
            closable={true}
            maskClosable={false}
            className="rounded-2xl"
            width={500}
        >
            <div className="mb-6 text-center">
                <Lottie
                    animationData={animationData}
                    lottieRef={lottieRef}
                    loop={status === 'pending'}
                    autoplay={true}
                    style={{ width: '100%', height: '100px' }} // Takes full width of parent (500px) and maintains aspect ratio
                />
                <Title level={4} className="mb-2">
                    Payment {status === 'pending' ? 'in progress' : status}
                </Title>
                <Text className="text-gray-600">
                    {status === 'pending' &&
                        "Great! We've detected your transaction on the blockchain and will now wait until the payment has been fully processed."}
                    {status === 'completed' &&
                        'Payment has been successfully processed!'}
                    {status === 'failed' && 'Payment processing has failed.'}
                </Text>
            </div>

            <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Text className="text-gray-600">Status</Text>
                        <Badge
                            status={getStatusColor(status)}
                            text={status === 'pending' ? 'In progress' : status}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Text className="text-gray-600">Payment of</Text>
                        <Text strong>{paymentAmount}</Text>
                    </div>

                    <div className="flex items-center justify-between">
                        <Text className="text-gray-600">Total amount</Text>
                        <Text strong>{totalAmount}</Text>
                    </div>

                    <div className="flex items-center justify-between">
                        <Text className="text-gray-600">Reference</Text>
                        <Space>
                            <Text strong>{reference}</Text>
                            <CopyOutlined
                                className="cursor-pointer text-gray-400 hover:text-gray-600"
                                onClick={() => handleCopy(reference)}
                            />
                        </Space>
                    </div>

                    <div className="flex items-center justify-between">
                        <Text className="text-gray-600">Transaction hash</Text>
                        <Space>
                            {status === 'completed' ? (
                                <a
                                    href={`https://etherscan.io/tx/${transactionHash}`} // Change to the correct blockchain explorer
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {transactionHash}
                                </a>
                            ) : (
                                <Text strong>{transactionHash}</Text>
                            )}
                            <CopyOutlined
                                className="cursor-pointer text-gray-400 hover:text-gray-600"
                                onClick={() => handleCopy(transactionHash)}
                            />
                        </Space>
                    </div>
                </div>
            </div>

            {/* <Button
                type="default"
                block
                icon={<ArrowLeftOutlined />}
                onClick={onBackClick}
                className="border-purple-500 text-purple-500 transition-colors hover:bg-purple-500 hover:text-white"
            >
                Back to acme.com
            </Button> */}
        </Modal>
    );
};

export default TransactionModal;
