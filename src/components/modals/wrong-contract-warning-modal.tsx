import { Modal, Button } from 'antd';
import React, { useState } from 'react';

interface IModalDetails {
    open: boolean;
    text: string;
}

const WarningContractStandardModal = ({ modalDetails }: IModalDetails) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log('Submit clicked');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        console.log('Cancel clicked');
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Warning Modal
            </Button>
            <Modal
                title="Warning"
                open={modalDetails.open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Submit"
                cancelText="Cancel"
                closable={false}
                maskClosable={false}
                keyboard={false}
            >
                <p>{modalDetails.text}</p>
            </Modal>
        </>
    );
};

export default WarningContractStandardModal;
