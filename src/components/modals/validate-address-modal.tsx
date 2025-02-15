import { Modal, Table, Spin, Tooltip, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useEffect, useState, useMemo } from 'react';
import { ethers } from 'ethers';
import { ALCHEMY_API } from '~/constants/api-constants';

interface IDataSource {
    key: number;
    lineNumber: number;
    address: string;
    amount: string;
}

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
    const [delteWrongAddress, setDeleteWrongAddress] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<IDataSource[]>('');
    const textData = textAreaRef?.current?.text || '';

    const provider = new ethers.JsonRpcProvider(ALCHEMY_API);

    // ✅ Memoize `dataSource` so it doesn't change on every render
    useMemo(() => {
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
    }, [textData]); // Only changes when textData changes

    // ✅ Store verified status in a stable state
    const [verifiedStatus, setVerifiedStatus] = useState<
        Record<string, { status: boolean; message: string } | null>
    >({});

    // Mock function to simulate checking Ethereum address validity
    const checkAddressOnBlockchain = async (
        address: string
    ): Promise<{ status: boolean; message: string }> => {
        const code = await provider.getCode(address);
        // if there is the single address is the contract address -> so show the delete wrong addresses
        if (code !== '0x') setDeleteWrongAddress(true);
        return code === '0x'
            ? {
                  status: true,
                  message: 'This is wallet address',
              }
            : {
                  status: false,
                  message: 'This is contract address',
              };
    };

    // ✅ Function to verify Ethereum address (Mock API Call)
    const verifyAddress = async (address: string) => {
        try {
            return await checkAddressOnBlockchain(address); // Replace with actual API call
        } catch {
            setDeleteWrongAddress(true);
            return {
                status: false,
                message: 'Not the correct address',
            };
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

            console.log({ results });

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
                    if (!(address in verifiedStatus))
                        return <Spin size="small" />;
                    return verifiedStatus[address]?.status ? (
                        <Tooltip title={verifiedStatus[address].message}>
                            <CheckCircleOutlined style={{ color: 'green' }} />
                        </Tooltip>
                    ) : (
                        <Tooltip title={verifiedStatus[address].message}>
                            <CloseCircleOutlined style={{ color: 'red' }} />
                        </Tooltip>
                    );
                },
            },
        ],
        [verifiedStatus]
    );

    function handleWrongAddress() {
        const data = dataSource
            .filter((data) => verifiedStatus[data.address].status)
            .map((data, index) => ({ ...data, lineNumber: index + 1 }));
        console.log({ data });
        setDataSource(data);
        setDeleteWrongAddress(false);
    }

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
            {delteWrongAddress && (
                <Button onClick={handleWrongAddress}>
                    Delete Wrong Address
                </Button>
            )}
        </Modal>
    );
};

export default ValidateAddressModal;
