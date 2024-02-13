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


const getLikes = async (date,location) => {
    try {
        const response = await fetch(`${LIKE_API_URL}/${date}?lat=${location.latitude}&lon=${location.longitude}`);
        if (!response.ok) {
            throw new Error('Error fetching likes');
        }
        const data = await response.json();
        return data.likes;
    } catch (error) {
        console.error('Error fetching likes:', error);
    }
    return 0;
}

const addLike = async (date,location) => {
    try {
        const response = await fetch(`${LIKE_API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date:date,lat:location.latitude,lon:location.longitude }),
        });
        if (!response.ok) {
            throw new Error('Error adding like');
        }
        const data = await response.json();
        return data.likes;
    } catch (error) {
        console.log('Error adding like:', error);
    }
    return 0;
}


export default LikeButton;