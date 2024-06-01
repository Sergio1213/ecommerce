import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Closesesion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Acción para remover un item de localStorage
    // Cambia 'itemKey' por la clave del ítem que deseas remover
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('username');

    // Configurar un temporizador para la redirección
    const timer = setTimeout(() => {
      window.location.replace('/home'); // Cambia '/otra-ruta' por la ruta a la que quieras redirigir
    }, 1500); // 1000 ms = 1 segundo

    // Limpiar el temporizador en caso de que el componente se desmonte antes de que se cumpla el tiempo
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status">
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Cerrando sesion...
        </span>
      </div>
    </div>
  );
};

export default Closesesion;
