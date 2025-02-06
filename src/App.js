import './App.css';
import LoginForm from './page/login/login'
import FindId from './page/login/find-id';
import FindPassword from './page/login/find-passward';
import Register from './page/login/signup';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="register" element={<Register/>}/>
        </Routes>
    </div>
  );
}

export default App;
