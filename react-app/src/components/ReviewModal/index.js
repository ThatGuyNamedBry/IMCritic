import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReviewThunk } from '../../store/reviews';
import { getMovieByIdThunk } from '../../store/movie';

const ReviewModal = ({ movieId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);

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

    return (
        <div>
            <h2>Create Review</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </label>
                <label>
                    Content:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </label>
                <button type="submit">Submit Review</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
            <ul className="errors-ul">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewModal;
