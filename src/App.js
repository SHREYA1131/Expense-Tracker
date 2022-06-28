import logo from './logo.svg';
import './App.css';
import {Button} from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/test" element={<Test/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
