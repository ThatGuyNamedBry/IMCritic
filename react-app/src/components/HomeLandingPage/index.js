import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllMoviesThunk } from '../../store/movie';
import { getReviewsForMovieThunk } from '../../store/reviews';
import './HomeLandingPage.css';

const HomeLandingPage = () => {
    const dispatch = useDispatch();
    const allMovies = useSelector(state => state.movies.allMovies);
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
    const [startFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
    const [startTopRatedIndex, setStartTopRatedIndex] = useState(0);

    const itemsPerPage = 4;

    useEffect(() => {
        dispatch(getAllMoviesThunk());
    }, [dispatch]);

    useEffect(() => {
        Object.values(allMovies).forEach((movie) => {
            // console.log('Fetching reviews for movie ID:', movie.id);
            dispatch(getReviewsForMovieThunk(movie.id));
        });
    }, [dispatch, allMovies]);

    const handlePrevTrailer = () => {
        setCurrentTrailerIndex(prevIndex => (prevIndex === recentMovies.length - 1 ? 0 : prevIndex + 1));
    };

    const handleNextTrailer = () => {
        setCurrentTrailerIndex(prevIndex => (prevIndex === 0 ? recentMovies.length - 1 : prevIndex - 1));
    };

    const handlePrevFeatured = () => {
        if (startFeaturedIndex - itemsPerPage >= 0) {
            setCurrentFeaturedIndex(startFeaturedIndex - itemsPerPage);
        }
    };

    const handleNextFeatured = () => {
        const remainingMovies = Object.values(allMovies).length - (startFeaturedIndex + itemsPerPage);
        if (remainingMovies >= 4) {
            setCurrentFeaturedIndex(startFeaturedIndex + itemsPerPage);
        }
    };

    const handlePrevTopRated = () => {
        if (startTopRatedIndex - itemsPerPage >= 0) {
            setStartTopRatedIndex(startTopRatedIndex - itemsPerPage);
        }
    };

    const handleNextTopRated = () => {
        const remainingMovies = Object.values(allMovies).length - (startTopRatedIndex + itemsPerPage);
        if (remainingMovies >= 4) {
            setStartTopRatedIndex(startTopRatedIndex + itemsPerPage);
        }
    };

    const recentMovies = Object.values(allMovies).sort((a, b) => b.id - a.id).slice(0, 2);
    // const recentMovies = Object.values(allMovies).reverse();

    const topRatedMovies = Object.values(allMovies)
        .sort((a, b) => b.average_rating - a.average_rating)
        .slice(startTopRatedIndex, startTopRatedIndex + itemsPerPage);

    return (
        <div className="home-landing-page">
            <div className="featured-trailers-section">
                {recentMovies.length > 0 && (
                    <div className="trailer-box">
                        <div className="item-scroll">
                            <button className='fa-solid fa-angle-left trailer-prev-button' onClick={handlePrevTrailer}></button>
                            <button className='fa-solid fa-angle-right trailer-next-button' onClick={handleNextTrailer}></button>
                        </div>
                        <iframe title="Recent Movie Trailer" width="600" height="350" src={recentMovies[currentTrailerIndex].trailer} frameBorder="0" allowFullScreen></iframe>
                    </div>
                )}
            </div>

            <div className="featured-movies-section">
                <h3>Featured Movies</h3>
                <div className="item-scroll">
                    {startFeaturedIndex > 0 && (
                        <button className={`fa-solid fa-angle-left prev-button`} onClick={handlePrevFeatured}></button>
                    )}
                    <button className='fa-solid fa-angle-right next-button' onClick={handleNextFeatured}></button>
                </div>
                <div className="featured-movies-list">
                    {Object.values(allMovies).reverse()
                        .slice(startFeaturedIndex, startFeaturedIndex + itemsPerPage)
                        .map(movie => (
                            <div key={movie.id} className="featured-movie">
                                <Link to={`/movies/${movie.id}`}>
                                    <img src={movie.img_url} alt={movie.title} />
                                </Link>
                                {movie.average_rating !== 0 ? (
                                    <div className="average-rating">
                                        <div className="rating-content">
                                            <span className="star-icon">★</span>
                                            {movie.average_rating.toFixed(1)}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="average-rating">
                                        <div className="rating-content">
                                            <span className="star-icon">★</span>
                                            New
                                        </div>
                                    </div>
                                )}
                                <Link to={`/movies/${movie.id}`}>
                                    <p>{movie.title}</p>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
            <div className="top-rated-section">
                <h3>Top Rated Movies</h3>
                <div className="item-scroll">
                {startTopRatedIndex > 0 && (
                        <button className={`fa-solid fa-angle-left prev-button`} onClick={handlePrevTopRated}></button>
                    )}
                    <button className='fa-solid fa-angle-right next-button' onClick={handleNextTopRated}></button>
                </div>
                <div className="featured-movies-list">
                    {topRatedMovies.map(movie => (
                        <div key={movie.id} className="featured-movie">
                            <Link to={`/movies/${movie.id}`}>
                                <img src={movie.img_url} alt={movie.title} />
                            </Link>
                            {movie.average_rating !== 0 ? (
                                <div className="average-rating">
                                    <div className="rating-content">
                                        <span className="star-icon">★</span>
                                        {movie.average_rating.toFixed(1)}
                                    </div>
                                </div>
                            ) : (
                                <div className="average-rating">
                                    <div className="rating-content">
                                        <span className="star-icon">★</span>
                                        New
                                    </div>
                                </div>
                            )}
                            <Link to={`/movies/${movie.id}`}>
                                <p>{movie.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeLandingPage;



 // console.log('Redux Store State:', allReviews);

//  {movie.average_rating && (
//     <div className="average-rating">
//         <div className="rating-content">
//             <span className="star-icon">★</span>
//             {movie.average_rating.toFixed(1)}
//         </div>
//     </div>
// )}
