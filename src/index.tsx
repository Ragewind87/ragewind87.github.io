import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ConnectFour from './ConnectFour/ConnectFour.js';
import reportWebVitals from './reportWebVitals.js';
import ErrorPage from './ErrorPage.js';
import Root, { loader as rootLoader } from './Root.js';
import { WelcomePage } from './WelcomePage.js';
import TspChess from './ChessGame/Components/TspChess.js';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
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
