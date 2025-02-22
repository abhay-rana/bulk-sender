import { Modal, Button } from 'antd';
import { useState } from 'react';

interface IModalDetails {
    open: boolean;
    text: string;
    handleOkBtn: () => void;
    handleCancelBtn: () => void;
}

const WarningContractStandardModal = ({ open, text, handleCancelBtn, handleOkBtn }: IModalDetails) => {
    const [isModalOpen, setIsModalOpen] = useState(open);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log('Submit clicked');
        handleOkBtn();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        console.log('Cancel clicked');
        handleCancelBtn();
        setIsModalOpen(false);
    };

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Warning Modal
            </Button> */}
           {open && <Modal
                title="Warning"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Change Standard"
                cancelText="Cancel"
                closable={false}
                maskClosable={false}
                keyboard={false}
            >
                <p>{text}</p>
            </Modal>}
        </>
    );
};

export default WarningContractStandardModal;
