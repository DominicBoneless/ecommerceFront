import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import '../estilo/ProductDetails.css';

const ProductDetails = ({config}) => {
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const { productId } = useParams();
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchToApi = async () => {
            try {
                const llamada = await fetch(`${config.apiUrl}/api/product/id?id=${productId}`);
                const response = await llamada.json();
                setProducto(response);
                console.log(response);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchToApi();
    }, [productId]);

    const handleAddToCart = () => {
        const addToCart = async () => {
            try {
                const llamada = await fetch(`${config.apiUrl}/api/cart/add?idProduct=${productId}&email=${email}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (llamada.ok) {
                    alert('Producto agregado al carrito');
                    navigate(`/cart/${email}`);
                }
                console.log(llamada.json);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        addToCart();
    }

    const setEmailOnChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div>
            {producto && (
                <div>
                    <button onClick={() => navigate(-1)}>Volver</button>
                    <h1>{producto.name}</h1>
                    <img src={producto.urlImg} alt={producto.name} className='imagen-producto-detalle'/>
                    <p>{producto.category}</p>
                    <p>Precio: ${producto.price}</p>
                    <input type="text" placeholder="Email" value={email} onChange={setEmailOnChange} />
                    <button onClick={handleAddToCart}>Agregar al carrito</button>
                </div>
            )}
            {!producto && <p>Cargando producto...</p>}
        </div>
    );

}

export default ProductDetails;