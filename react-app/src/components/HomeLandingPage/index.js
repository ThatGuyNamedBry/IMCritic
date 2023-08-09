import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMoviesThunk } from '../../store/movie';
import './HomeLandingPage.css';

const HomeLandingPage = () => {
    const dispatch = useDispatch();
    const allMovies = useSelector(state => state.movies.allMovies);
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);

    useEffect(() => {
        dispatch(getAllMoviesThunk());
    }, [dispatch]);

    const handlePrevTrailer = () => {
        setCurrentTrailerIndex(prevIndex => (prevIndex === 0 ? Object.values(allMovies).length - 1 : prevIndex - 1));
    };

    const handleNextTrailer = () => {
        setCurrentTrailerIndex(prevIndex => (prevIndex === Object.values(allMovies).length - 1 ? 0 : prevIndex + 1));
    };

    const featuredMovie = Object.values(allMovies)[currentTrailerIndex];

    return (
        <div className="home-landing-page">
            {/* <h2>Top Movies</h2> */}
            {featuredMovie && (
                <div className="trailer-box">
                    <h3>{featuredMovie.title}</h3>
                    <p>{featuredMovie.release_year}</p>
                    {/* <p>{featuredMovie.genre}</p> */}
                    <iframe title="Movie Trailer" width="560" height="315" src={featuredMovie.trailer} frameBorder="0" allowFullScreen></iframe>
                    <div className="navigation-buttons">
                        <button onClick={handlePrevTrailer}>Previous Trailer</button>
                        <button onClick={handleNextTrailer}>Next Trailer</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomeLandingPage;
