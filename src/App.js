import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Carrito from './components/Carrito';
import Pedido from './components/Pedido';

const App = () => {
  const config = { 
    apiUrl: 'http://Localhost:8080',
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <LoginPage config = {config} />
          </>
        } />
        <Route path="/products/:email" element={
          <>
            <Products config = {config}/>
          </>
        } />
        <Route path="/product/:productId" element={
          <>
            <ProductDetails config = {config}/>
          </>
        } />
        <Route path="/cart/:email" element={
          <>
            <Carrito config = {config}/>
          </>
        } />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
