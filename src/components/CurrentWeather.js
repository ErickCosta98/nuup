import React, { useEffect, useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../config/api';

const CurrentWeather = ({ location }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!location.latitude || !location.longitude) {
                return;
            }
            try {
                const response = await fetch(
                    `${WEATHER_API_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=es&appid=${WEATHER_API_KEY}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setWeatherData({
                        icon: data.weather[0].icon,
                        temperature: data.main.temp,
                        description: data.weather[0].description,
                        city: data.name
                    });
                } else {
                    console.error('Error fetching weather data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [location]);

    if (!weatherData) {
        // Si no hay datos, mostrar "Cargando..."
        return <p className="text-2xl text-center mt-12">Cargando...</p>;
    }

    return (
        <div className="card bg-gradient-to-b from-nevada-300 to-nevada-600  mt-5 rounded-xl shadow-md w-96">
            <div className="card-body p-4 text-nevada-50">
                <h1 className="text-3xl font-bold">Clima actual</h1>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                        <p className="text-xl">{weatherData.description}</p>
                    </div>
                    <img
                        className="w-20 h-20 m-auto"
                        src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
                        alt="Weather Icon"
                    />
                </div>
                <p className="text-center mt-4">Clima en {weatherData.city}</p>
            </div>
        </div>
    );
};

export default CurrentWeather;
