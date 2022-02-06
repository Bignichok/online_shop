import Admin from 'pages/Admin';
import Auth from 'pages/Auth';
import Cart from 'pages/Cart';
import DevicePage from 'pages/DevicePage';
import Devices from 'pages/Devices';
import NotFoundPage from 'pages/NotFoundPage';
import Layout from 'pages/Layout';
import Home from 'pages/Home';
import PrivateRoute from 'components/PrivateRoute';

import pathNamesConfig from './pathNamesConfig';

export const routesConfig = [
    {
        path: pathNamesConfig.home,
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            {
                path: pathNamesConfig.cart,
                element: <Cart />,
            },
            {
                path: pathNamesConfig.login,
                element: <Auth />,
            },
            {
                path: pathNamesConfig.registration,
                element: <Auth />,
            },
            {
                path: pathNamesConfig.devices,
                element: <Devices />,
                children: [
                    { path: pathNamesConfig.device, element: <DevicePage /> },
                ],
            },
        ],
    },
    {
        path: pathNamesConfig.admin,
        element: (
            <PrivateRoute>
                <Admin />
            </PrivateRoute>
        ),
    },
    { path: '*', element: <NotFoundPage /> },
];
