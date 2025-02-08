import React, { useEffect } from 'react';
import Container from '~/components/container/container';
import ErrorBoundary from '~/components/container/error-boundary';
import Routes from '~/routes/routes';
import { initializeReOwn } from './providers/walletProvider';

const App: React.FC = () => {
    useEffect(() => {
        initializeReOwn();
    },[])
    return (
        <ErrorBoundary>
            <Container>
             <Routes />
            </Container>
        </ErrorBoundary>
    );
};

export default App;
