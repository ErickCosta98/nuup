import React, { useState, useEffect }  from 'react';
import {HeartIcon} from '@heroicons/react/24/outline'

import {
    useSelector,
    useDispatch,
    selectLikes,
    fetchLikes,
    addLikeAsync,
} from '../lib/redux';


const LikeButton = ({date,location}) => {

    const dispatch = useDispatch();
    const likes = useSelector(selectLikes);

    useEffect(() => {
        dispatch(fetchLikes({date,location}));
    }, [date, location, dispatch]);

    const handleLikeClick = () => {
        dispatch(addLikeAsync({date,location}));
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

export default LikeButton;