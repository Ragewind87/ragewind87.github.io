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

ReactDOM.createRoot(document.querySelector('#root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
