import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  const isAuth = user?.token;

  return (
    <Routes>
      <Route path='/' element={isAuth ? <Navigate to='/' /> : <Login />} />
      {/* <Route path='/' element={<Home /> } /> */}
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      {/* <Route path='/about' element={<h1>About</h1>} />
      <Route path='/dashboard' element={<h1>Dashboard</h1>} /> */}
    </Routes>
  );
}

export default App;
