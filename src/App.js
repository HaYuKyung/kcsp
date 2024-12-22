import './App.css';
import LoginForm from './page/Login/Login';
import FindId from './page/FindAccount/FindId';
import FindPassword from './page/FindAccount/FindPassword';
import Register from './page/Register/Register';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/find-id" element={<FindId />} />
            <Route path="/find-password" element={<FindPassword />} />
            <Route path="register" element={<Register/>}/>
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
