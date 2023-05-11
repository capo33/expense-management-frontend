import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      {/* <Route path='/about' element={<h1>About</h1>} />
      <Route path='/dashboard' element={<h1>Dashboard</h1>} /> */}
    </Routes>
  );
}

export default App;
