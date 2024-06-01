import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

export default function Productlist() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `https://${import.meta.env.VITE_BACKEND_URL}/api/products`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    // Almacena el ID del producto en localStorage al hacer clic
    localStorage.setItem('productId', productId);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-2 py-2 sm:px-2 sm:py-2 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Productos disponibles
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/Productview`}
              onClick={() => handleProductClick(product.id)}>
              {' '}
              {/* Agrega onClick para manejar el clic */}
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.attributes.image}
                    alt={product.attributes.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      />
                      {product.attributes.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.attributes.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    $
                    {product.attributes.price ||
                      'Precio no disponible'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
