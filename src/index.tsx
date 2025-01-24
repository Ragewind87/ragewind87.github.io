import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import ErrorPage from './ErrorPage.tsx';
import TspChess from './ChessGame/Components/TspChess.js';
import { ConnectFour } from './ConnectFour/ConnectFour.tsx';
import { WelcomePage } from './WelcomePage.tsx';
import { Root } from './Root.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'ConnectFour',
                element: <ConnectFour />,
            },
            {
                path: 'Chess',
                element: <TspChess />,
            },
            {
                path: 'WelcomePage',
                element: <WelcomePage />,
            },
        ],
    },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.querySelector('#root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
