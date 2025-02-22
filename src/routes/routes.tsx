import React, { useEffect } from 'react';
import { Route, Router, Switch } from 'wouter';
import { navigate } from 'wouter/use-location';

import BulkSenderScreen from '~/screens/bulk-sender-screen';
import multitransactionBundler from '~/screens/multi-transaction-bundler';
import TestComponent from '~/screens/test/test-component';
import TestComponentTwo from '~/screens/test/test-component-two';

const RouteNotFound = React.lazy(() => import('~/screens/404'));

const routeConfig = [
    {
        path: '/bulk-sender',
        component: BulkSenderScreen,
    },
    {
        path: '/test',
        component: TestComponent,
    },
    {
        path: '/test2',
        component: TestComponentTwo,
    },
    {
        path: "/multi-transaction-bundler",
        component: multitransactionBundler
    }
];

const Routes: React.FC = () => {
    useEffect(() => {
        navigate('/bulk-sender');
    }, []);

    return (
        <>
            <Router>
                <React.Suspense fallback={<h3>Loading Routes...</h3>}>
                    <Switch>
                        {routeConfig.map((item, index) => (
                            <Route
                                key={index}
                                path={item.path}
                                component={item.component}
                            />
                        ))}
                        <Route component={RouteNotFound} />
                    </Switch>
                </React.Suspense>
            </Router>
        </>
    );
};

export default Routes;
