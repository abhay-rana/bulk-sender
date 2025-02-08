import { Table, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';

const TestComponent = () => {
    const [dataSource, setDataSource] = useState([]);
    const [verificationStatus, setVerificationStatus] = useState({});

    // Mock API call - replace with your actual API call
    const fetchVerificationStatus = async (address) => {
        try {
            // Simulate API call with timeout
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
            // Replace this with your actual API call
            return Math.random() > 0.5; // Simulate success/failure
        } catch (error) {
            console.error('Error fetching verification status:', error);
            return false;
        }
    };

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
                render: (address) => {
                    if (!(address in verificationStatus)) {
                        return <Spin size="small" />;
                    }
                    return verificationStatus[address] ? (
                        <CheckCircleOutlined style={{ color: 'green' }} />
                    ) : (
                        <CloseCircleOutlined style={{ color: 'red' }} />
                    );
                },
            },
        ],
        [verificationStatus]
    );

    // Fetch verification status for new data
    useEffect(() => {
        const fetchVerificationForAddresses = async () => {
            const addresses = dataSource.map((item) => item.address);
            const unverifiedAddresses = addresses.filter(
                (address) => !(address in verificationStatus)
            );

            if (unverifiedAddresses.length > 0) {
                const statusResults = await Promise.all(
                    unverifiedAddresses.map(fetchVerificationStatus)
                );

                const newStatuses = unverifiedAddresses.reduce(
                    (acc, address, index) => {
                        acc[address] = statusResults[index];
                        return acc;
                    },
                    {}
                );

                setVerificationStatus((prev) => ({
                    ...prev,
                    ...newStatuses,
                }));
            }
        };

        if (dataSource.length > 0) {
            fetchVerificationForAddresses();
        }
    }, [dataSource]);

    useEffect(() => {
        setTimeout(() => {
            setDataSource([
                {
                    lineNumber: '1',
                    address: '0x123123123',
                    amount: '123',
                    key: '123',
                },
            ]);
        }, 1000);
    }, []);

    return (
        <>
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    size="small"
                    scroll={{ y: '60vh' }}
                />
            </div>
        </>
    );
};

export default TestComponent;
