import React, { useState, useEffect } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../config/api';

const WeatherStatus = ({ location }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!location.latitude || !location.longitude) {
                return;
            }
            try {
                const response = await fetch(
                    `${WEATHER_API_URL}/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=es&appid=${WEATHER_API_KEY}`
                );
                if (response.ok) {
                    const data = await response.json();
                    // Agrupar los datos por fecha
                    const groupedData = data.list.reduce((acc, item) => {
                        const date = item.dt_txt.split(' ')[0];
                        if (!acc[date]) {
                            acc[date] = [];
                        }
                        acc[date].push(item);
                        return acc;
                    }, {});
                    setWeatherData(groupedData);
                } else {
                    console.error('Error fetching weather data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [location]);

    const handleDateClick = (date) => {
        // Si el usuario hace clic en la misma fecha, la deseleccionamos
        setSelectedDate(selectedDate === date ? null : date);
    };

    return (
        //mostar el clima de los proximos 5 dias
        <div className="flex flex-col items-center justify-center w-full h-full ">
            <h1 className="text-3xl font-bold text-nevada-600">Pronóstico del clima</h1>
            {Object.keys(weatherData).map((date, index) => (
                <div key={index} className='card bg-gradient-to-br from-nevada-300 text-nevada-600 hover:text-nevada-800 focus:text-nevada-800 to-nevada-100 m-2 rounded-md shadow-md w-96'
                    onClick={() => handleDateClick(date)}
                >
                    <div className="card-body flex justify-between gap-x-6 py-5 border-b-nevada-400">
                        <div className="flex min-w-0 gap-x-4 justify-center ml-5" >
                            <span className="text-2xl font-bold">{date}</span>
                            <span className="text-2xl font-semibold">{Math.round(weatherData[date].reduce((acc, item) => acc + item.main.temp, 0) / weatherData[date].length)}°C</span>
                        </div>
                        
                            <img className="h-15 w-15 mr-5 rounded-full"
                                src={`http://openweathermap.org/img/wn/${weatherData[date][0].weather[0].icon}.png`}
                                alt="Weather icon"
                            />
                    </div>




                    {selectedDate === date && (
                        <ul className="divide-y divide-nevada-400 shadow-md">
                            {weatherData[date].map((item, idx) => (
                                <li key={idx} className="flex justify-between gap-x-6 py-5 ">
                                    <div className="flex min-w-0 gap-x-4 justify-center" >
                                        <p className="text-lg ml-1 font-semibold  text-nevada-700">{item.dt_txt.split(' ')[1]}</p>

                                        <div className="min-w-0 flex-auto">
                                            <p className="text-lg font-semibold leading-6 text-nevada-700">{item.main.temp}°C - {item.weather[0].description}</p>
                                        </div>

                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <img className="h-12 w-12 flex-none rounded-full mr-5"
                                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                            alt="img"
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WeatherStatus;
