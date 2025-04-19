import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "./Pages/UserContext";

import NavbarComponent from "./Pages/navbar";
import Home from "./Pages/home";
import Cart from "./Pages/cart";
import Footer from "./Pages/footer";
import PizzaDetail from "./Pages/pizzadetail";
import Register from "./Pages/register";
import Login from "./Pages/login";
import Profile from "./Pages/profile";
import NotFound from "./Pages/notfund";
import './index.css';

function App() {
  const { token } = useUser();
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => {
        console.error("Error al cargar las pizzas:", err);
      });
  }, []);

  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home pizzas={pizzas} />} />
        <Route path="/cart" element={<Cart />} />

        {/* 🔐 Rutas públicas bloqueadas si estás logueado */}
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />

        {/* 🔒 Ruta protegida */}
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />

        {/* Detalle pizza */}
        <Route path="/pizza/:id" element={<PizzaDetail />} />

        {/* Error 404 */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
