import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:1337/api/auth/local?=populate*`,
        {
          identifier: email,
          password,
        }
      );
      console.log(response.data);
      // Maneja la respuesta del servidor aquí, como redirigir al usuario o mostrar un mensaje de éxito
      console.log('inicio correcto');
      localStorage.setItem('jwt', response.data.jwt);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('id', response.data.user.id);
      const userid = localStorage.getItem('id');

      const response2 = await axios.get(
        `http://localhost:1337/api/shoppingcarts?filters[user][id][$eq]=${userid}&fields[0]=id`
      );
      localStorage.setItem('cartid', response2.data.data[0].id);

      window.location.replace('/home');
    } catch (error) {
      alert(error.response.data.error.message);
      console.error('Error al iniciar sesion:', error);
      // Maneja los errores aquí, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Iniciar Sesion
        </h2>

        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Correo
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Contraseña
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Enviar
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-4">
          No tienes cuenta?{' '}
          <a
            href="/Signup"
            className="text-blue-500 hover:text-blue-800">
            regístrate
          </a>{' '}
          <br />o{' '}
          <a
            href="/home"
            className="text-blue-500 hover:text-blue-800">
            ir a inicio
          </a>
        </p>
      </div>
    </div>
  );
}
