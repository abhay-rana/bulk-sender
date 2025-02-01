import { Modal } from 'antd';

const AddressesExampleModal = ({ isVisible, onClose }) => {
    return (
        <>
            <Modal
                title="Example"
                open={isVisible}
                onCancel={onClose}
                footer={null}
                width={600}
            >
                <div className="font-mono flex flex-col gap-4">
                    <div>
                        <div className="text-gray-500">
                            for ERC721(address, id)
                        </div>
                        <div>0x63Ed7e96CaA84CE852187447eE1Ed3bfEA38B316,60</div>
                        <div>
                            0x7B32C3158b7f193D3Ea33f548817549949D492ca2,61
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500">
                            for ERC1155(address, id, amount)
                        </div>
                        <div>
                            0xb50cA0C79F9dF405B708b3E517EC99FC12B7AdFB,1,100
                        </div>
                        <div>
                            0x57eC2aEFB7bA9237E6a83B03Bb7CecD5C494AcA1,2,95
                        </div>
                    </div>
                    <div className="text-sm mt-4 text-gray-500">
                        Or paste data, using separate comma or one of = ; :
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AddressesExampleModal;
