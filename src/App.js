import CurrentWeather from "./components/CurrentWeather";
import { useEffect, useState } from 'react';
import WeatherStatus from "./components/WeatherStatus";


const App = () => {
  const [location, setLocation] = useState({});

  useEffect(() => {
     
    getLocation().then((location) => {
      setLocation(location);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <CurrentWeather location={location} />
      <WeatherStatus location={location} />      
    </div>
  );
};

/**
 * Obtiene la ubicación del usuario utilizando la geolocalización del navegador.
 * Si la geolocalización no es compatible, se devuelve la ubicación predeterminada de la Ciudad de México.
 * @returns {Promise<{latitude: number, longitude: number}>} La ubicación del usuario en forma de objeto con las propiedades de latitud y longitud.
 */
const  getLocation = async () => {
try {
  //si el navegador no soporta la geolocalizacion
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported');
  } 
    //obtener la ubicacion del usuario
    const location = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    //retornar la ubicacion del usuario
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    };
} catch (e) {
    console.error('Error getting location:', e);
    //usar las coordenadas de la ciudad de mexico como ubicacion por defecto
  return { latitude: 19.4326, longitude: -99.1332 };
}     
}

export default App;
