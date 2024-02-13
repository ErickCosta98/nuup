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

const fetchWeatherData = async (location) => {
    if (!location.latitude || !location.longitude) {
        return null;
    }
    try {
        const response = await fetch(
            `${WEATHER_API_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=es&appid=${WEATHER_API_KEY}`
        );
        if (!response.ok) {        
            throw new Error('Error fetching weather data:', response.statusText);
        }
        const data = await response.json();
        console.log(data);
            return {
                icon: data.weather[0].icon,
                temperature: data.main.temp,
                description: data.weather[0].description,
                city: data.name,
                //date en formato yyyy-mm-dd
                date: new Date().toISOString().split('T')[0],
            }
    } catch (error) {
        console.error(error);
    }
};

export default CurrentWeather;
