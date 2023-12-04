import React, { useState } from 'react'
import { createImageUrl } from '../services/movieServices'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import {arrayUnion, arrayRemove, doc, setDoc, updateDoc} from 'firebase/firestore'
import {db} from "../services/firebase.jsx"
import {UserAuth} from "../context/AuthContext.jsx"

const MovieItem = ({movie}) => {

    const [like, setLike] = useState(false)
    const {user} = UserAuth()

    const {title, backdrop_path, poster_path} = movie

    const markFavShow = async () => {
      const userEmail = user?.email;
      if (userEmail) {
        const userDoc = doc(db, 'users', userEmail);
        setLike((prevLike) => !prevLike); // Toggle the liked state
  
        if (like) {
          // If liked, remove the movie from favorites
          await updateDoc(userDoc, {
            favShows: arrayRemove({ ...movie }),
          });
        } else {
          // If not liked, add the movie to favorites
          await updateDoc(userDoc, {
            favShows: arrayUnion({ ...movie }),
          });
        }
      } else {
        alert('Please Login to save or remove a movie');
      }
    };

  return (
    <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
        <img
        className='w-full h-40 block object-cover object-top' 
        src={createImageUrl(backdrop_path ?? poster_path, "w500")} alt={title} />

        <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>
            <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-extrabold'>{movie.title}</p>
            <p onClick={markFavShow} className='cursor-pointer'>
                {like ? <FaHeart size={20} className='absolute top-2 left-2 text-gray-300'/> : <FaRegHeart size={20} className='absolute top-2 left-2 text-gray-300'/>}
            </p>
        </div>
    </div>
  )
}

export default MovieItem