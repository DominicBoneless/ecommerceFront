import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader } from 'react-bootstrap';
import '../estilo/Products.css';

const Products = ({config}) => {
    // 1. Declaración de estados (si es necesario)
    const [productos, setProductos] = useState([]);
    const { email } = useParams(); // Obtener el id del producto del enrutamiento
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${config.apiUrl}/api/product`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // O cualquier otro método para procesar la respuesta
        })
            .then(data => {
                console.log(data);
                setProductos(data);
                console.log(productos[0]);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    // 2. Declaración de constantes
    const CONSTANT_NAME = 'valor constante'; // Reemplaza con el valor que necesites

    // 3. Manejadores de eventos (handlers)
    const handleClick = (id) => {
        // Lógica para manejar el clic
        console.log('Botón clicado: ' + id);
        navigate(`/product/${id}`); // Redirección a la ruta con el id del producto
        // Puedes actualizar el estado aquí si es necesario
        // setStateVariable(nuevoValor);
    };

    // 4. Renderizado del componente
    return (
        <div>
            <h1>Productos</h1>
            <button onClick={() => navigate(`/cart/${email}`)}>Carrito</button>
            <div className="products-container">
                {
                    productos.map((producto) => (
                        <Card key={producto.id} className="product-card" onClick={() => handleClick(producto.id)}>
                            <Card.Img variant="top" src={producto.urlImg} className="product-img" />
                            <Card.Body>
                                <Card.Title className="product-card-title">{producto.name}</Card.Title>
                                <Card.Text>
                                    <strong>Precio:</strong> ${producto.price.toFixed(2)}<br />
                                    <strong>Categoría:</strong> {producto.category}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        </div>
    );    
};

export default Products;