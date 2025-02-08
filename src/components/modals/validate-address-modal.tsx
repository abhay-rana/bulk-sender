import { Modal, Table, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useEffect, useState, useMemo } from 'react';

// Mock function to simulate checking Ethereum address validity
const checkAddressOnBlockchain = async (address: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.random() > 0.5); // Simulate API response (50% chance of being valid)
        }, 1000); // Simulate network delay
    });
};

const ValidateAddressModal = ({
    isOpen,
    onClose,
    selectedTokenType,
    textAreaRef,
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedTokenType: string;
    textAreaRef: { current?: { text: string } };
}) => {
    const textData = textAreaRef?.current?.text || '';

    const [dataSource, setDataSource] = useState([]);

    // ✅ Memoize `dataSource` so it doesn't change on every render
    // const dataSource = useMemo(() => {
    //     return textData
    //         .split('\n')
    //         .filter((line) => line.trim() !== '') // Remove empty lines
    //         .map((line, index) => {
    //             const [address, amount] = line.split(',');
    //             return {
    //                 key: index + 1,
    //                 lineNumber: index + 1,
    //                 address: address?.trim(),
    //                 amount: amount?.trim() || '0',
    //             };
    //         });
    // }, [textData]); // Only changes when textData changes

    // ✅ Store verified status in a stable state
    const [verifiedStatus, setVerifiedStatus] = useState<
        Record<string, boolean | null>
    >({});

    useEffect(() => {
        console.log('modal is mounted');
        setTimeout(() => {
            const textData = textAreaRef?.current?.text || '';
            const dataSource = textData
                .split('\n')
                .filter((line) => line.trim() !== '') // Remove empty lines
                .map((line, index) => {
                    const [address, amount] = line.split(',');
                    return {
                        key: index + 1,
                        lineNumber: index + 1,
                        address: address?.trim(),
                        amount: amount?.trim() || '0',
                    };
                });
            setDataSource(dataSource);
        }, 2000);
        return () => {
            console.log('unmounts');
        };
    }, [isOpen]);

    // ✅ Function to verify Ethereum address (Mock API Call)
    const verifyAddress = async (address: string) => {
        try {
            return await checkAddressOnBlockchain(address); // Replace with actual API call
        } catch {
            return false;
        }
    };

    // ✅ Fetch verification status only once
    useEffect(() => {
        let isMounted = true; // To prevent updates after unmount

        const fetchVerificationStatus = async () => {
            // Skip if already verified
            const addressesToCheck = dataSource.filter(
                (row) => !(row.address in verifiedStatus)
            );

            if (addressesToCheck.length === 0) return; // Stop if already verified

            // Create an array of promises
            const promises = addressesToCheck.map((row) =>
                verifyAddress(row.address)
            );

            // Execute all verification requests in parallel
            const results = await Promise.all(promises);

            // Convert results into an object mapping address -> validity
            const statusUpdates = addressesToCheck.reduce(
                (acc, row, index) => {
                    acc[row.address] = results[index];
                    return acc;
                },
                {} as Record<string, boolean>
            );

            if (isMounted) {
                setVerifiedStatus((prev) => ({ ...prev, ...statusUpdates }));
            }
        };

        if (dataSource.length > 0) {
            fetchVerificationStatus();
        }

        return () => {
            isMounted = false; // Cleanup to prevent memory leaks
        };
    }, [dataSource]); // ✅ Only runs when `dataSource` changes

    // ✅ Column definition
    const columns = useMemo(
        () => [
            {
                title: 'Line No.',
                dataIndex: 'lineNumber',
                key: 'lineNumber',
                width: 80,
                fixed: 'left',
            },
            {
                title: 'Ethereum Address',
                dataIndex: 'address',
                key: 'address',
                ellipsis: true,
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                width: 100,
            },
            {
                title: 'Verified',
                dataIndex: 'address',
                key: 'verified',
                width: 100,
                render: (address: string, record) => {
                    console.log('record', record);
                    if (!(address in verifiedStatus))
                        return <Spin size="small" />;
                    return verifiedStatus[address] ? (
                        <CheckCircleOutlined style={{ color: 'green' }} />
                    ) : (
                        <CloseCircleOutlined style={{ color: 'red' }} />
                    );
                },
            },
        ],
        [verifiedStatus]
    );

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            title="Validate the addresses"
            footer={null}
            width={600}
            style={{
                height: '70vh',
                display: 'flex',
                flexDirection: 'column',
            }}
            destroyOnClose
        >
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    size="small"
                    scroll={{ y: '60vh' }}
                />
            </div>
        </Modal>
    );
};

export default ValidateAddressModal;
