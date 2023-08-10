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
        setCurrentTrailerIndex(prevIndex => (prevIndex === recentMovies.length - 1 ? 0 : prevIndex + 1));
    };

    const handleNextTrailer = () => {
        setCurrentTrailerIndex(prevIndex => (prevIndex === 0 ? recentMovies.length - 1 : prevIndex - 1));
    };

    const recentMovies = Object.values(allMovies).sort((a, b) => b.id - a.id).slice(0, 2);
    // const recentMovies = Object.values(allMovies).reverse();

    return (
        <div className="home-landing-page">
            <div className="featured-trailers-section">
                {recentMovies.length > 0 && (
                    <div className="trailer-box">
                        <iframe title="Recent Movie Trailer" width="360" height="202.5" src={recentMovies[currentTrailerIndex].trailer} frameBorder="0" allowFullScreen></iframe>
                        {/* <h3>{recentMovies[currentTrailerIndex].title}</h3> */}
                        <div className="navigation-buttons">
                            <button onClick={handlePrevTrailer}>Previous Trailer</button>
                            <button onClick={handleNextTrailer}>Next Trailer</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="featured-movies-section">
                <h3>Featured Movies</h3>
                <div className="featured-movies-list">
                    {Object.values(allMovies).map(movie => (
                        <div key={movie.id} className="featured-movie">
                            <p>{movie.title}</p>
                            <img src={movie.img_url} alt={movie.title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeLandingPage;
