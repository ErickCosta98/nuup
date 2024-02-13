import CurrentWeather from "./components/CurrentWeather";
import { useEffect, useState } from 'react';
import WeatherStatus from "./components/WeatherStatus";

const App = () => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    const fetchLocation = async () => {
      const loc = await getLocation();
      setLocation(loc);
    };

    fetchLocation();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <CurrentWeather location={location} />
      <WeatherStatus location={location} />
    </div>
  );
};

//funcion para optener la ubicacion del usuario
async function getLocation() {

  //si el navegador no soporta la geolocalizacion
  if (!navigator.geolocation) {
    //usar las coordenadas de la ciudad de mexico como ubicacion por defecto
    return { latitude: 19.4326, longitude: -99.1332 };
    
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
    
  
}

export default App;
