import React, { createContext, useEffect, useRef, useState } from 'react';
import { ManipulateAndSaveSocketDate } from '~/services/manipulate-socket-services';
import { parseWebSocketData } from '~/utils/parseWebSocketData';

interface WebSocketContextProps {
    connect: (url: string) => Promise<void>;
    sendMessage: (message: string) => void;
    disconnect: () => void;
    isConnected: boolean;
    addMessageListener: (listener: (data: any) => void) => void;
    removeMessageListener: (listener: (data: any) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
    undefined
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const socketRef = useRef<WebSocket | null>(null); // WebSocket instance
    const [isConnected, setIsConnected] = useState(false); // Connection state
    const isConnectedRef = useRef(false); // Ref for connection status
    const listenersRef = useRef<((data: any) => void)[]>([]); // Message listeners

    const connect = (url: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (socketRef.current) {
                console.warn('WebSocket already connected!');
                resolve(); // Resolve immediately if already connected
                return;
            }

            const ws = new WebSocket(url);
            socketRef.current = ws;

            ws.onopen = () => {
                console.log('WebSocket connected');
                setIsConnected(true);
                isConnectedRef.current = true; // Update the ref
                resolve(); // Resolve the promise when the connection opens
            };

            ws.onmessage = (event) => {
                console.log('WebSocket message received:', event.data);
                const { data } = event;

                let parsedData = {};
                try {
                    if (data instanceof ArrayBuffer) {
                        // Parse binary data
                        const decoder = new TextDecoder('utf-8');
                        const text = decoder.decode(data);
                        parsedData = parseWebSocketData(text);
                    } else {
                        // Parse text data
                        parsedData = parseWebSocketData(data);
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket data:', error);
                }

                // Notify all listeners
                listenersRef.current.forEach((listener) =>
                    listener(parsedData)
                );
                ManipulateAndSaveSocketDate(parsedData);
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error); // Reject the promise on error
            };

            ws.onclose = (event) => {
                console.log('WebSocket disconnected:', event.reason);
                setIsConnected(false);
                isConnectedRef.current = false; // Update the ref
                socketRef.current = null;
            };
        });
    };

    const sendMessage = (message: string) => {
        if (socketRef.current && isConnectedRef.current) {
            socketRef.current.send(message);
        } else {
            console.warn('WebSocket is not connected.');
        }
    };

    const disconnect = () => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
            setIsConnected(false);
            isConnectedRef.current = false; // Update the ref
        }
    };

    const addMessageListener = (listener: (data: any) => void) => {
        listenersRef.current.push(listener);
    };

    const removeMessageListener = (listener: (data: any) => void) => {
        listenersRef.current = listenersRef.current.filter(
            (l) => l !== listener
        );
    };

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider
            value={{
                connect,
                sendMessage,
                disconnect,
                isConnected,
                addMessageListener,
                removeMessageListener,
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketContext;
