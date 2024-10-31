import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilo/Pedido.css';

const Pedido = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="thank-you-container">
            <h1>Gracias por su pedido</h1>
            <button onClick={handleBackToHome} className="back-button">
                Volver al inicio
            </button>
        </div>
    );
};

export default Pedido;