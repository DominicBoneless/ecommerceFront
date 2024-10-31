import React, { useState } from 'react';
import Login, { Render } from 'react-login-page';
import Logo from 'react-login-page/logo';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({config}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fail, setFail] = useState(false);
  const navigate = useNavigate();

  // Función para manejar el restablecimiento de los valores de los campos
  const handleReset = () => {
    setEmail(''); // Restablecer el estado del email
    setPassword(''); // Restablecer el estado de la contraseña
  };

  const handleSubmit = () => {
    if(email !== '' && password !== ''){
      console.log('Respuesta enviada');
      const data = {
        "email": email,
        "password": password,
      }
      fetch(`${config.apiUrl}/api/user/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Convierte el objeto a una cadena JSON
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // O cualquier otro método para procesar la respuesta
      })
      .then(data => {
        console.log(data);
        if(data){
          navigate(`/products/${email}`);
          setFail(false);
        }else{
          setFail(true);
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }else{
      console.log('No pueden estar vacíos');
    }
  };

  return (
    <Login>
      <Render>
        {({ fields, buttons, blocks }) => {
          return (
            <div>
              <header>
                {blocks.logo} {blocks.title}
              </header>
              <div>
                <label>
                  {fields.username} 
                  <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Please input Username" 
                  />
                </label>
              </div>
              <div>
                <label>
                  {fields.password} 
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Please enter password" 
                  />
                </label>
              </div>
              <div>
                {buttons.reset}
                <button type="button" onClick={handleReset}>
                  Reset
                </button>
              </div>
              <div>
                {buttons.submit}
                <button type="button" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <div>
                { fail && <p> usuario no encontrado </p>}
              </div>
            </div>
          );
        }}
      </Render>
      <Login.Block keyname="logo" tagName="span">
        <Logo />
      </Login.Block>
      <Login.Block keyname="title" tagName="span">
        Login
      </Login.Block>
    </Login>
  );
};

export default LoginPage;
