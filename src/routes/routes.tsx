import React from 'react';
import { Route, Router, Switch } from 'wouter';
import PrivateRoute from '~/routes/private-routes';
import FullLoaderScreen from '~/screens/component-test/full-loader.screen';
import TabScreen from '~/screens/component-test/tabs-screen';

import HomeScreen from '~/screens/home-screen';
import LoginScreen from '~/screens/login-screen';
import SecureRouteOne from '~/screens/secure-route-one';

const ButtonScreen = React.lazy(
    () => import('~/screens/component-test/button-screen')
);

const RouteNotFound = React.lazy(() => import('~/screens/404'));

const routeConfig = [
    {
        path: '/',
        component: HomeScreen,
    },
    {
        path: '/button',
        component: ButtonScreen,
    },
    {
        path: '/tabs',
        component: TabScreen,
    },
    {
        path: '/full-loader',
        component: FullLoaderScreen,
    },
    {
        path: '/secure1',
        component: SecureRouteOne,
    },
    {
        path: '/private',
        component: PrivateRoute,
    },
    {
        path: '/login',
        component: LoginScreen,
    },
];

const Routes: React.FC = () => {
    return (
        <>
            <Router>
                <React.Suspense fallback={<h1>Loading Routes...</h1>}>
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
