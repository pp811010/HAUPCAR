import Layout from './components/Layout.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CarPage from './pages/CarPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<CarPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App