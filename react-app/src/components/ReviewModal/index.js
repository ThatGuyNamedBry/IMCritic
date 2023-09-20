import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReviewThunk } from '../../store/reviews';
import { getMovieByIdThunk } from '../../store/movie';
import './ReviewModal.css';

const ReviewModal = ({ movieId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [activeRating, setActiveRating] = useState(rating);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            movie_id: movieId,
            rating: Number(rating),
            content: content,
        };

        const data = await dispatch(createReviewThunk(formData));

        if (data.errors) {
            setErrors(data.errors);
        } else {
            dispatch(getMovieByIdThunk(movieId));
            closeModal();
        }
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleStarHover = (value) => {
        setActiveRating(value);
    };

    return (
        <div className="review-modal-container">
            <h2>Create Review</h2>
            <form onSubmit={handleSubmit}>
            <ul className="errors">
                {Object.values(errors).map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
                <label>
                    Rating:
                    <div className="star-rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <span
                            key={index}
                            className={`star ${index < activeRating ? 'filled' : 'empty'}`}
                            onMouseEnter={() => handleStarHover(index + 1)}
                            onMouseLeave={() => setActiveRating(rating)}
                            onClick={() => handleStarClick(index + 1)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                </label>
                <label>
                    Content:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </label>
                <button type="submit">Submit Review</button>
                <button type="button" className='cancel-review-bttn' onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default ReviewModal;
