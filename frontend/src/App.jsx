import Layout from './components/Layout.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import CarPage from './pages/carpages/CarPage.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <CarPage/>,
      },
    ],
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}
export default App