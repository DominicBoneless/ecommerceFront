import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import '../estilo/Carrito.css';

const Carrito = ({ config }) => {
    const navigate = useNavigate();
    const { email } = useParams();
    const [carrito, setCarrito] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchToApi = async () => {
            try {
                const llamada = await fetch(`${config.apiUrl}/api/cart/cartByEmail?email=${email}`);
                const response = await llamada.json();
                setCarrito(response);
                console.log(response);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchToApi();
    }, [email, config.apiUrl]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (carrito && carrito.productsId) {
                const uniqueProductIds = [...new Set(carrito.productsId)];
                
                const productPromises = uniqueProductIds.map(async (productId) => {
                    const response = await fetch(`${config.apiUrl}/api/product/id?id=${productId}`);
                    return await response.json();
                });
                
                const fetchedProducts = await Promise.all(productPromises);
                setProductos(fetchedProducts);
            }
        };
        fetchProducts();
    }, [carrito, config.apiUrl]);

    const handleClick = (productId) => {
        console.log("Product clicked:", productId);
    };

    const handleProcess = () => {
        const fetchToApi = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/cart/procesar?email=${email}`, {
                    method: 'DELETE',
                });
    
                // Check if the response is OK and parse it as JSON to get the boolean result
                if (response.ok) {
                    const result = await response.json(); // Assuming the API returns true/false in JSON
                    if (result) {
                        navigate(`/pedido`);
                    } else {
                        alert('Error al procesar el pedido');
                    }
                } else {
                    alert('Error al procesar el pedido');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al procesar el pedido');
            }
        };
        fetchToApi();
    };    

    if (!carrito) return (<div> <p className="loading">Cargando carrito...</p> <button onClick={() => navigate(`/products/${email}`)}>Volver a productos</button> </div>);

    return (
        <div className="cart-container">
            <h1>Carrito de Compras</h1>
            <div className="cart-list">
                {productos.map((producto) => (
                    <Card key={producto.id} className="product-card" onClick={() => handleClick(producto.id)}>
                        <Card.Img variant="top" src={producto.urlImg} className="product-img" />
                        <Card.Body>
                            <Card.Title className="product-card-title">{producto.name}</Card.Title>
                            <Card.Text>
                                <strong>Precio:</strong> ${producto.price ? producto.price.toFixed(2) : 'N/A'}<br />
                                <strong>Categoría:</strong> {producto.category || 'Sin categoría'}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div className="total-price">
                <strong>Total: ${carrito.totalPrice ? carrito.totalPrice.toFixed(2) : '0.00'}</strong>
            </div>
            <button onClick={() => navigate(`/products/${email}`)}>Volver a productos</button>
            <button onClick={handleProcess}>Procesar pedido</button>
        </div>
    );
};

export default Carrito;
