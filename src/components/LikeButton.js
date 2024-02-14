import React, { useState, useEffect }  from 'react';
import {HeartIcon} from '@heroicons/react/24/outline'
import { LIKE_API_URL } from '../config/api';

const LikeButton = ({date,location}) => {

    const [likes, setLikes] = useState(0);

    useEffect(() => {
        getLikes(date,location).then((data) => {
            setLikes(data);
        });
    }, [date,location]);

    const handleLikeClick = () => {
        addLike(date,location).then((data) => {
            setLikes(data);
        });
    };

    return (
        <div>
            <button className="w-full bg-nevada-500 hover:bg-nevada-600 focus:bg-nevada-600 text-nevada-50
                flex justify-center items-center"
                onClick={handleLikeClick}
            >
                <span >Like</span>
                <HeartIcon className="w-5 h-5" />
                <small>{likes}</small>
            </button>
        </div>
    );
}



/**
 * Obtiene el número de "me gusta" para una fecha y ubicación específicas.
 * @param {string} date - La fecha para la cual se desea obtener los "me gusta".
 * @param {object} location - El objeto de ubicación que contiene latitud y longitud.
 * @returns {Promise<number>} El número de "me gusta" obtenidos.
 */
const getLikes = async (date, location) => {
    try {
        // Intentamos hacer una solicitud GET a la API de "me gusta" con la fecha, latitud y longitud proporcionadas
        const response = await fetch(`${LIKE_API_URL}/${date}?lat=${location.latitude}&lon=${location.longitude}`);
        // Si la respuesta no es exitosa (el código de estado no es 200), lanzamos un error
        if (!response.ok) {
            throw new Error('Error al obtener los "me gusta"');
        }
        // Si la respuesta es exitosa, convertimos la respuesta en JSON
        const data = await response.json();
        // Devolvemos el número de "me gusta"
        return data.likes;
    } catch (error) {
        // Si hay algún error en el proceso anterior, lo registramos en la consola
        console.error('Error al obtener los "me gusta":', error);
    }
    // Si algo sale mal, devolvemos 0
    return 0;
}


/**
 * Agrega un "me gusta" a la API con la fecha, latitud y longitud proporcionadas.
 * @param {string} date - La fecha del "me gusta".
 * @param {object} location - La ubicación del "me gusta" con las propiedades latitude y longitude.
 * @returns {Promise<number>} El número de "me gusta" agregados.
 */
const addLike = async (date, location) => {
    try {
        // Intentamos hacer una solicitud POST a la API de "me gusta" con la fecha, latitud y longitud proporcionadas
        const response = await fetch(`${LIKE_API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: date, lat: location.latitude, lon: location.longitude }),
        });
        // Si la respuesta no es exitosa (el código de estado no es 200), lanzamos un error
        if (!response.ok) {
            throw new Error('Error al agregar "me gusta"');
        }
        // Si la respuesta es exitosa, convertimos la respuesta en JSON
        const data = await response.json();
        // Devolvemos el número de "me gusta"
        return data.likes;
    } catch (error) {
        // Si hay algún error en el proceso anterior, lo registramos en la consola
        console.log('Error al agregar "me gusta":', error);
    }
    // Si algo sale mal, devolvemos 0
    return 0;
}

export default LikeButton;