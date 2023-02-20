import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './routes/root';
import Book from "./routes/book";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "book/:title/:id",
    element: <Book />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
