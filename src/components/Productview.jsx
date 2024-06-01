import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Productview() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = parseInt(
        localStorage.getItem('productId'),
        10
      );
      try {
        const response = await axios.get(
          `http://${
            import.meta.env.VITE_BACKEND_URL
          }/api/products/${productId}`
        );
        setProduct(response.data.data.attributes);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          {/* Aquí va el código del breadcrumb */}
        </nav>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <img
              src={product.image}
              alt={product.name}
              className="mt-4 rounded-lg"
            />
            <p className="mt-4 text-base text-gray-700">
              {product.description}
            </p>
            <p className="mt-4 text-base text-gray-700">
              {product.color}
            </p>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product.price}
            </p>

            <div className="flex items-center border-gray-100">
              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {' '}
                -{' '}
              </span>
              <input
                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                type="number"
                defaultValue={1}
                min="1"
              />
              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {' '}
                +{' '}
              </span>
            </div>
            <form className="mt-10">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Añadir al carrito
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
