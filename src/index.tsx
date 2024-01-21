import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ConnectFour from './ConnectFour';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Root, { loader as rootLoader } from './Root';
import { EmptyPanel } from './EmptyPanel';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: rootLoader,
    children: [
      {
        path: "CordyGameHub",
        element: <ConnectFour />,
      },
      {
        path: "/",
        element: <EmptyPanel />,
      },
    ],
  },  
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
