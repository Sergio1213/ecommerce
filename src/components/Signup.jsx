import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value) {
          error = 'Correo es requerido';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Correo no es válido';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Contraseña es requerida';
        } else if (value.length < 6) {
          error = 'La contraseña debe tener al menos 6 caracteres';
        }
        break;
      case 'repeatPassword':
        if (!value) {
          error = 'Confirmar contraseña es requerido';
        } else if (value !== password) {
          error = 'Las contraseñas no coinciden';
        }
        break;
      case 'firstName':
        if (!value) {
          error = 'Nombre es requerido';
        }
        break;
      case 'lastName':
        if (!value) {
          error = 'Apellido es requerido';
        }
        break;
      case 'phone':
        if (!value) {
          error = 'Celular es requerido';
        } else if (/^\d{9}$/.test(value)) {
          console.log();
          error = 'El formato del celular debe ser 123-456-7890';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post(
        'http://localhost:1337/api/auth/local/register',

        {
          email,
          password,
          username: firstName,
          lastname: lastName,
          phone,
        }
      );
      console.log(response.data);
      localStorage.setItem('jwt', response.data.jwt);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('id', response.data.user.id);

      const nresponse = await axios.post(
        'http://localhost:1337/api/shoppingcarts',
        {
          data: {
            user: parseInt(localStorage.getItem('id')),
          },
        }
      );
      console.log(nresponse.data);
      window.location.replace('/home');

      // Handle server response here, like redirecting user or showing success message
    } catch (error) {
      console.error('Error al registrarse:', error);
      alert(error.response.data.error.message);
      // Handle errors here, like showing error message to user
    }
  };

  const validate = () => {
    const validationErrors = {};
    if (!email) {
      validationErrors.email = 'Correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Correo no es válido';
    }
    if (!password) {
      validationErrors.password = 'Contraseña es requerida';
    } else if (password.length < 6) {
      validationErrors.password =
        'La contraseña debe tener al menos 6 caracteres';
    }
    if (!repeatPassword) {
      validationErrors.repeatPassword =
        'Confirmar contraseña es requerido';
    } else if (repeatPassword !== password) {
      validationErrors.repeatPassword =
        'Las contraseñas no coinciden';
    }
    if (!firstName) {
      validationErrors.firstName = 'Nombre es requerido';
    }
    if (!lastName) {
      validationErrors.lastName = 'Apellido es requerido';
    }
    if (!phone) {
      validationErrors.phone = 'Celular es requerido';
    } else if (/^\d{9}$/.test(phone)) {
      validationErrors.phone =
        'El formato del celular debe ser 123-456-7890';
    }
    return validationErrors;
  };

  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Regístrate
        </h2>

        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              className={`block py-2.5 px-0 w-full text-sm ${
                errors.email
                  ? 'text-red-500 border-red-500'
                  : 'text-gray-900'
              } bg-transparent border-0 border-b-2 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 peer`}
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateField('email', e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className={`peer-focus:font-medium absolute text-sm ${
                errors.email ? 'text-red-500' : 'text-gray-500'
              } duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
              Correo
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="floating_password"
              className={`block py-2.5 px-0 w-full text-sm ${
                errors.password
                  ? 'text-red-500 border-red-500'
                  : 'text-gray-900'
              } bg-transparent border-0 border-b-2 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 peer`}
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) =>
                validateField('password', e.target.value)
              }
            />
            <label
              htmlFor="floating_password"
              className={`peer-focus:font-medium absolute text-sm ${
                errors.password ? 'text-red-500' : 'text-gray-500'
              } duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
              Contraseña
            </label>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="repeatPassword"
              id="floating_repeat_password"
              className={`block py-2.5 px-0 w-full text-sm ${
                errors.repeatPassword
                  ? 'text-red-500 border-red-500'
                  : 'text-gray-900'
              } bg-transparent border-0 border-b-2 ${
                errors.repeatPassword
                  ? 'border-red-500'
                  : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 peer`}
              placeholder=" "
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              onBlur={(e) =>
                validateField('repeatPassword', e.target.value)
              }
            />
            <label
              htmlFor="floating_repeat_password"
              className={`peer-focus:font-medium absolute text-sm ${
                errors.repeatPassword
                  ? 'text-red-500'
                  : 'text-gray-500'
              } duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
              Confirmar contraseña
            </label>
            {errors.repeatPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.repeatPassword}
              </p>
            )}
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="firstName"
                id="floating_first_name"
                className={`block py-2.5 px-0 w-full text-sm ${
                  errors.firstName
                    ? 'text-red-500 border-red-500'
                    : 'text-gray-900'
                } bg-transparent border-0 border-b-2 ${
                  errors.firstName
                    ? 'border-red-500'
                    : 'border-gray-300'
                } appearance-none focus:outline-none focus:ring-0 peer`}
                placeholder=" "
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) =>
                  validateField('firstName', e.target.value)
                }
              />
              <label
                htmlFor="floating_first_name"
                className={`peer-focus:font-medium absolute text-sm ${
                  errors.firstName ? 'text-red-500' : 'text-gray-500'
                } duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                Nombre
              </label>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="lastName"
                id="floating_last_name"
                className={`block py-2.5 px-0 w-full text-sm ${
                  errors.lastName
                    ? 'text-red-500 border-red-500'
                    : 'text-gray-900'
                } bg-transparent border-0 border-b-2 ${
                  errors.lastName
                    ? 'border-red-500'
                    : 'border-gray-300'
                } appearance-none focus:outline-none focus:ring-0 peer`}
                placeholder=" "
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={(e) =>
                  validateField('lastName', e.target.value)
                }
              />
              <label
                htmlFor="floating_last_name"
                className={`peer-focus:font-medium absolute text-sm ${
                  errors.lastName ? 'text-red-500' : 'text-gray-500'
                } duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                Apellido
              </label>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="floating_phone"
              className={`block py-2.5 px-0 w-full text-sm ${
                errors.phone
                  ? 'text-red-500 border-red-500'
                  : 'text-gray-900'
              } bg-transparent border-0 border-b-2 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } appearance-none focus:outline-none focus:ring-0 peer`}
              placeholder=" "
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={(e) => validateField('phone', e.target.value)}
            />
            <label
              htmlFor="floating_phone"
              className={`peer-focus:font-medium absolute text-sm ${
                errors.phone ? 'text-red-500' : 'text-gray-500'
              } duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
              Celular (123-456-7890)
            </label>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Enviar
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-4">
          ¿Ya tienes cuenta?{' '}
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-800">
            Iniciar sesión
          </a>
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
