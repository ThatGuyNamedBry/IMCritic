import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { updateReviewThunk } from '../../store/reviews';
import { getMovieByIdThunk } from '../../store/movie';

const EditReviewModal = ({ review }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [rating, setRating] = useState(review.rating.toString());
    const [content, setContent] = useState(review.content);
    const [errors, setErrors] = useState([]);
    const [activeRating, setActiveRating] = useState(rating);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            rating: Number(rating),
            content: content,
        };

        const data = await dispatch(updateReviewThunk(review.id, formData));

        if (data.errors) {
            setErrors(data.errors);
        } else {
            dispatch(getMovieByIdThunk(review.movie_id));
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
            <h2>Edit Review</h2>
            <form onSubmit={handleSubmit}>
            <ul className="errors">
                {errors.map((error, idx) => (
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
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default EditReviewModal;
