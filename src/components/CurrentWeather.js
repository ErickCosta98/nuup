import React, { useEffect, useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL,WEATHER_API_ICON_URL } from '../config/api';
import LikeButton from './LikeButton';

const CurrentWeather = ({ location }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetchWeatherData(location).then((data) => {
            setWeatherData(data);
        });
    }, [location]);

    if (!weatherData) {
        // Si no hay datos, mostrar "Cargando..."
        return <p className="text-2xl text-center mt-12">Cargando...</p>;
    }

    return (
        <div className="card bg-gradient-to-b from-nevada-300 to-nevada-600  mt-5 rounded-xl shadow-md w-96">
            <div className="card-body p-4 text-nevada-50">
                <h1 className="text-3xl font-bold">Clima actual</h1>
                <p className="mt-4">{weatherData.city}</p>
                {/* fecha */}
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                        <p className="text-xl">{weatherData.description}</p>
                    </div>
                    <img
                        className="w-20 h-20 m-auto"
                        src={`${WEATHER_API_ICON_URL}/${weatherData.icon}.png`}
                        alt="Weather Icon"
                    />
                </div>
                
            </div>
            {/* boton de like en el footer y contador de likes */}
            <div className="card-footer bg-nevada-400 rounded-sm">
               <LikeButton date={weatherData.date} location={location} />
                </div>
        </div>
    );
};


/**
 * Obtiene los datos del clima para una ubicación dada.
 * @param {Object} location - El objeto de ubicación que contiene latitud y longitud.
 * @returns {Promise<Object|null>} - Una promesa que se resuelve en un objeto con los datos del clima, o null si ocurre un error.
 */
const fetchWeatherData = async (location) => {
    // Si la ubicación no tiene latitud o longitud, la función se detiene y devuelve null
    if (!location.latitude || !location.longitude) {
        return null;
    }
    try {
        // Intentamos hacer una solicitud a la API del clima con la latitud y longitud proporcionadas
        const response = await fetch(
            `${WEATHER_API_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=es&appid=${WEATHER_API_KEY}`
        );
        // Si la respuesta no es exitosa (el código de estado no es 200), lanzamos un error
        if (!response.ok) {        
            throw new Error('Error al obtener los datos del clima:', response.statusText);
        }
        // Si la respuesta es exitosa, convertimos la respuesta en JSON
        const data = await response.json();
        // Imprimimos los datos en la consola
        console.log(data);
        // Devolvemos un objeto con los datos del clima que necesitamos
        return {
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            description: data.weather[0].description,
            city: data.name,
            // La fecha en formato yyyy-mm-dd
            date: new Date().toISOString().split('T')[0],
        }
    } catch (error) {
        // Si hay algún error en el proceso anterior, lo registramos en la consola
        console.error(error);
        // Devolvemos null
        return null;
    }
};
export default CurrentWeather;
