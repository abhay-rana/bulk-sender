import { Button } from 'antd';
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { UploadOutlined } from '@ant-design/icons';

import AddressesExampleModal from '~/components/modals/address-example-modal';

const LineNumberedTextarea = forwardRef((_, ref) => {
    const [text, setText] = useState<string>('');
    const [lineNumbers, setLineNumbers] = useState<number[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const lineNumbersRef = useRef<HTMLDivElement | null>(null);
    const [modalState, setModalState] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
        ref,
        () => ({
            setText,
            text,
        }),
        [text]
    );

    // Function to calculate the number of lines
    const calculateNumLines = (str: string): number => {
        if (!textareaRef.current) return 1;

        const textarea = textareaRef.current;
        const style = window.getComputedStyle(textarea);

        const parseValue = (v: string) =>
            v.endsWith('px') ? parseInt(v.slice(0, -2), 10) : 0;

        const paddingLeft = parseValue(style.paddingLeft);
        const paddingRight = parseValue(style.paddingRight);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return 1;

        context.font = `${style.fontSize} ${style.fontFamily}`;
        const textareaWidth =
            textarea.getBoundingClientRect().width - paddingLeft - paddingRight;
        const words = str.split(' ');
        let lineCount = 0;
        let currentLine = '';

        for (let i = 0; i < words.length; i++) {
            const wordWidth = context.measureText(words[i] + ' ').width;
            const lineWidth = context.measureText(currentLine).width;

            if (lineWidth + wordWidth > textareaWidth) {
                lineCount++;
                currentLine = words[i] + ' ';
            } else {
                currentLine += words[i] + ' ';
            }
        }

        if (currentLine.trim() !== '') {
            lineCount++;
        }

        return lineCount;
    };

    // Function to calculate line numbers
    const calculateLineNumbers = () => {
        const lines = text.split('\n');
        const numLines = lines.map((line) => calculateNumLines(line));

        const lineNumbersArray: (number | string)[] = [];
        let i = 1;
        while (numLines.length > 0) {
            const numLinesOfSentence = numLines.shift()!;
            lineNumbersArray.push(i);
            if (numLinesOfSentence > 1) {
                Array(numLinesOfSentence - 1)
                    .fill('')
                    .forEach(() => lineNumbersArray.push(''));
            }
            i++;
        }

        setLineNumbers(lineNumbersArray as number[]);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
                alert('Please upload a CSV or TXT file');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const fileContent = event.target.result as string;
                    setText(fileContent.trim());
                }
            };
            reader.readAsText(file);
        }
    };

    useEffect(() => {
        calculateLineNumbers();
    }, [text]);

    useEffect(() => {
        if (!textareaRef.current || !lineNumbersRef.current) return;

        const textarea = textareaRef.current;
        const lineNumbersDiv = lineNumbersRef.current;

        const handleScroll = () => {
            lineNumbersDiv.scrollTop = textarea.scrollTop;
        };

        textarea.addEventListener('scroll', handleScroll);
        return () => textarea.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!textareaRef.current || !lineNumbersRef.current) return;

        const textarea = textareaRef.current;
        const lineNumbersDiv = lineNumbersRef.current;

        const ro = new ResizeObserver(() => {
            lineNumbersDiv.style.height = `${textarea.getBoundingClientRect().height}px`;
            calculateLineNumbers();
        });

        ro.observe(textarea);
        return () => ro.disconnect();
    }, []);

    return (
        <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 p-4">
            {/* Header with 'See Examples' Button */}
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">
                    Please provide a list of recipients
                </h4>
                <Button type="link" onClick={() => setModalState(true)}>
                    See Examples
                </Button>
            </div>

            {/* Line Numbers & Textarea Container */}
            <div className="flex max-h-96 w-full overflow-hidden rounded-md border border-gray-300">
                {/* Line Numbers */}
                <div
                    ref={lineNumbersRef}
                    className="w-12 overflow-hidden border-r border-gray-300 bg-gray-100 p-2 text-right text-gray-600"
                >
                    {lineNumbers.map((num, index) => (
                        <div key={index}>{num || '\u00A0'}</div>
                    ))}
                </div>

                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    value={text}
                    placeholder="Enter manually or drag & drop a file"
                    onChange={(e) => setText(e.target.value)}
                    className="h-52 w-full resize-none border-none p-2 outline-none"
                    aria-label="Text input with line numbers"
                />
            </div>

            {/* File Upload Button */}
            <div className="flex items-center justify-between">
                <p className="text-gray-600">Supported Files: CSV, TXT</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".csv,.txt"
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

            {/* Example Modal */}
            <AddressesExampleModal
                isVisible={modalState}
                onClose={() => setModalState(false)}
            />
        </div>
    );
});

export default LineNumberedTextarea;
