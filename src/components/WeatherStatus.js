import React, { useState, useEffect } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL,WEATHER_API_ICON_URL } from '../config/api';

const WeatherStatus = ({ location }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchWeatherData(location).then((data) => {
            setWeatherData(data);
        });
    }, [location]);

    const handleDateClick = (date) => {
        // Si el usuario hace clic en la misma fecha, la deseleccionamos
        setSelectedDate(selectedDate === date ? null : date);
    };

    if (!weatherData) {
        return <p className="text-2xl text-center mt-12">Cargando...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full ">
            <h1 className="text-3xl font-bold text-nevada-600">Pronóstico del clima</h1>
            {Object.keys(weatherData).slice(1).map((date, index) => (
                
                <div key={index} className='card bg-nevada-500 hover:text-nevada-100 focus:text-nevada-100 text-nevada-50 m-2 rounded-md shadow-md w-96 '
                    onClick={() => handleDateClick(date)}
                >
                    
                    <div className="card-body flex justify-between gap-x-6 border-b-nevada-400 mr-2 justify-items-center items-center ">
                        <img className="h-15 w-15"
                                    src={`${WEATHER_API_ICON_URL}/${weatherData[date][0].weather[0].icon}.png`}
                                    alt="Weather icon"
                                />
                            <span className="text-xl font-semibold">{date}</span>
                            {/* temperatura minima y maxima de este dia*/}
                            <span className="text-xl font-semibold">
                               {weatherData[date].reduce((acc, item) => Math.min(acc, item.main.temp_min), Infinity)}°C
                                -
                                {weatherData[date].reduce((acc, item) => Math.max(acc, item.main.temp_max), -Infinity)}°C
                            </span>
                            
                    </div>

                    {selectedDate === date && (
                        <div className='bg-nevada-200'>
                            <ul className="divide-y divide-nevada-400 shadow-md ">
                            {weatherData[date].map((item, idx) => (
                                <li key={idx} className="flex justify-between border-b-nevada-400 mr-2 justify-items-center items-center ">

                                        <p className="text-lg ml-2 font-semibold  text-nevada-700">{item.dt_txt.split(' ')[1]}</p>

                                        <div className="min-w-0 flex-auto ml-2">
                                            <p className="text-lg font-semibold leading-6 text-nevada-700">{item.main.temp}°C - {item.weather[0].description}</p>
                                        </div>


                                        <img className="h-12 w-12 flex-none rounded-full mr-5"
                                            src={`${WEATHER_API_ICON_URL}/${item.weather[0].icon}.png`}
                                            alt="img"
                                        />

                                </li>
                            ))}
                            </ul>
                        </div>
                        
                    )}
                </div>
            ))}
        </div>
    );
};


/**
 * Obtiene los datos del clima de la API basado en la ubicación proporcionada.
 * @param {Object} location - El objeto de ubicación que contiene latitud y longitud.
 * @returns {Promise<Object>} - Una promesa que se resuelve en los datos del clima agrupados.
 */
const fetchWeatherData = async (location) => {
    // Si la ubicación no tiene latitud o longitud, la función se detiene y no devuelve nada
    if (!location.latitude || !location.longitude) {
        return;
    }
    try {
        // Intentamos hacer una solicitud a la API del clima con la latitud y longitud proporcionadas
        const response = await fetch(
            `${WEATHER_API_URL}/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=es&appid=${WEATHER_API_KEY}`
        );
        // Si la respuesta no es exitosa (el código de estado no es 200), lanzamos un error
        if (!response.ok) {
            throw new Error('Error al obtener los datos del clima:', response.statusText);
        }
        // Si la respuesta es exitosa, convertimos la respuesta en JSON
        const data = await response.json();
        // Agrupamos los datos por fecha
        const groupedData = data.list.reduce((acc, item) => {
            const date = item.dt_txt.split(' ')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {});
        // Devolvemos los datos agrupados
        return groupedData;
       
    } catch (error) {
        // Si hay algún error en el proceso anterior, lo registramos en la consola
        console.error(error);
        // Devolvemos un objeto vacío
        return {};
    }
};

export default WeatherStatus;
