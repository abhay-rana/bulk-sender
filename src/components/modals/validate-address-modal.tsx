import { Modal } from 'antd';
import { Ref } from 'react';

const ValidateAddressModal = ({
    isOpen,
    onClose,
    selectedTokenType,
    textAreaRef,
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedTokenType: string;
    textAreaRef: { setText: () => void };
}) => {
    console.log(textAreaRef?.current?.text);
    return (
        <>
            <Modal
                open={isOpen}
                onCancel={onClose}
                title="Validate the addresses"
                footer={null}
            >
                this is address validate modal :{selectedTokenType}
            </Modal>
        </>
    );
};

export default ValidateAddressModal;
