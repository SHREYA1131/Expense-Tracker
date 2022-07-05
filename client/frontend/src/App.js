import logo from './logo.svg';
import './App.css';
import {Button} from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/test" element={<Test/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
