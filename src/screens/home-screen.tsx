import React from 'react';
import { Link } from 'wouter';
import { Button } from '~/components';
import { useAppLocation } from '~/components/library/routing';

const HomeScreen: React.FC = () => {
    const [_, setLocation] = useAppLocation();
    return (
        <>
            <div className="flex  h-full flex-col items-center justify-center">
                <div>Home Screen</div>
                <div className="mt-10 flex flex-col gap-4">
                    <Link to="/button">Button Components</Link>
                </div>
                <div className="mt-10 flex flex-col gap-4">
                    <Link to="/full-loader">Overlay loader</Link>
                </div>
                <div className="mt-10 flex flex-col gap-4">
                    <Link to="/tabs">Tabs</Link>
                </div>
                <div className="mt-10 flex flex-col gap-4">
                    <Link to="/secure1">Secure Route</Link>
                </div>
                <div className="mt-10 flex flex-col gap-4">
                    <Button onClick={() => setLocation('/secure1')}>
                        Secure Route 2
                    </Button>
                </div>
            </div>
        </>
    );
};

export default HomeScreen;
