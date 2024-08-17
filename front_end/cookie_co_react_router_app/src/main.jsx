import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'

import router from './router.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
  </RouterProvider>
);
