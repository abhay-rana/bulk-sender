import { Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';

const TestComponentTwo = () => {
    const verifiedAddress = {};
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setDataSource([
                {
                    key: '1',
                    lineNumber: '1',
                    address: '0x123qwdsa',
                    amount: '90',
                },
            ]);
        }, 3000);
    }, []);

    const columns = useMemo(() => {
        return [
            {
                title: 'Line Number',
                dataIndex: 'lineNumber',
            },
            {
                title: 'Address',
                dataIndex: 'address',
            },
            {
                amount: 'Amount',
                dataIndex: 'amount',
            },
            {
                title: 'Verified',
                dataIndex: 'verification',
                render: (address) => {},
            },
        ];
    }, []);

    async function fetchAddress(address) {
        // Simulate API call with timeout
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        // Replace this with your actual API call
        return Math.random() > 0.5; // Simulate success/failure
    }

    const PromisesArray = [];

    useEffect(() => {
        if (dataSource.length > 0) {
            dataSource.forEach((data) => {
                if (!(data.address in verifiedAddress)) {
                    verifiedAddress[data.address] = null;
                    PromisesArray.push(fetchAddress(data.address)); // save the promise into the array
                }
            });
        }
    }, [dataSource]);

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

export default TestComponentTwo;
