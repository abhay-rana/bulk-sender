import { Button } from 'antd';
import React, {
    useState,
    DragEvent,
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { UploadOutlined } from '@ant-design/icons';
import AddressesExampleModal from '~/components/modals/address-example-modal';

const TextAreaWithDragDrop = forwardRef((_, ref) => {
    const [text, setText] = useState<string>('');
    const [lineCount, setLineCount] = useState<number>(1);
    const [modal_state, setModalState] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        setText,
    }));

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setText(value);
        setLineCount(value ? value.split('\n').length : 0);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const fileContent = event.target.result as string;
                    setText(fileContent.trim());
                    setLineCount(fileContent.trim().split('\n').length);
                }
            };
            reader.readAsText(file);
        }
    };

    const handleScroll = () => {
        if (textareaRef.current && lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const renderLineNumbers = () => {
        return Array.from({ length: Math.max(1, lineCount) }, (_, i) => (
            <div
                key={i + 1}
                className="h-[24px] select-none pr-2 text-right text-gray-400"
            >
                {i + 1}
            </div>
        ));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.name.endsWith('.csv')) {
                // You can replace this with your preferred notification method
                alert('Please upload a CSV file');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const fileContent = event.target.result as string;
                    setText(fileContent.trim());
                    setLineCount(fileContent.trim().split('\n').length);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 p-4 shadow-lg"
        >
            <div className="flex flex-row justify-between">
                <h4>Please provide list of receipients</h4>
                <Button type="link" onClick={() => setModalState(true)}>
                    See Examples
                </Button>
            </div>
            <div className="flex flex-row">
                <div
                    ref={lineNumbersRef}
                    className="flex h-40 flex-col overflow-hidden border-r border-gray-300 bg-gray-50 px-1 py-2"
                >
                    {renderLineNumbers()}
                </div>
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleTextChange}
                    onScroll={handleScroll}
                    placeholder="Enter manually or drag & drop a file"
                    className="text-sm font-mono h-40 w-full resize-none bg-gray-100 p-2 focus:border-blue-400 focus:outline-none focus:ring"
                    style={{ border: 'none' }}
                />
            </div>
            <div className="flex flex-row justify-between">
                <p>Supported Files : CSV, Text</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                />
                <Button
                    type="dashed"
                    icon={<UploadOutlined />}
                    onClick={() => fileInputRef.current?.click()}
                >
                    Upload File
                </Button>
            </div>
            <AddressesExampleModal
                isVisible={modal_state}
                onClose={() => setModalState(false)}
            />
        </div>
    );
});

export default TextAreaWithDragDrop;
