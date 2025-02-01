import React from 'react';
import { Route, Router, Switch } from 'wouter';

import BulkSenderScreen from '~/screens/bulk-sender-screen';

const RouteNotFound = React.lazy(() => import('~/screens/404'));

const routeConfig = [
    {
        path: '/bulk-sender',
        component: BulkSenderScreen,
    },
];

const Routes: React.FC = () => {
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
