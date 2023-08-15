// Action Types
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const LOAD_REVIEW = 'reviews/LOAD_REVIEW';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// Action Creators

// Get All Reviews Action
export const getAllReviewsAction = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews,
    };
};

// Get Review by ID Action
export const getReviewByIdAction = (review) => {
    return {
        type: LOAD_REVIEW,
        payload: review,
    };
};

// Create Review Action
export const createReviewAction = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review,
    };
};

// Edit/Update a Review Action
export const updateReviewAction = (review) => {
    return {
        type: UPDATE_REVIEW,
        payload: review,
    };
};

// Delete a Review Action
export const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId,
    };
};

// Thunks

// Get All Reviews Thunk
export const getAllReviewsThunk = () => async (dispatch) => {
  const response = await fetch('/api/reviews');
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getAllReviewsAction(reviews));
    return reviews;
  }
};

// Get All Reviews for a Movie Thunk
export const getReviewsForMovieThunk = (movieId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/movie/${movieId}`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(getAllReviewsAction(reviews));
        return reviews;
    }
};

// Get Review by ID Thunk
export const getReviewByIdThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`);
    if (response.ok) {
        const review = await response.json();
        dispatch(getReviewByIdAction(review));
        return review;
    }
};

// Create a Review Thunk
export const createReviewThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/reviews/newReview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (response.ok) {
        const newReview = await response.json();
        return dispatch(createReviewAction(newReview));
    } else {
        const errorData = await response.json();
        return errorData;
    }
};

// Edit/Update a Review Thunk
export const updateReviewThunk = (reviewId, formData) => async (dispatch) => {
    const response = await fetch(`/api/reviews/edit/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (response.ok) {
        const updatedReview = await response.json();
        return dispatch(updateReviewAction(updatedReview));
    } else {
        const errorData = await response.json();
        return { errors: errorData.errors };
    }
};

// Delete a Review Thunk
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/delete/${reviewId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteReviewAction(reviewId));
        return response;
    }
};

// Reducer function
const initialState = {
    allReviews: {},
    singleReview: {},
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const allReviewsObject = {};
            action.payload.forEach((review) => {
                allReviewsObject[review.id] = review;
            });
            return { ...state, allReviews: allReviewsObject };
        case LOAD_REVIEW:
            return { ...state, singleReview: { [action.payload.id]: action.payload } };
        case CREATE_REVIEW:
            return { ...state, allReviews: { ...state.allReviews, [action.payload.id]: action.payload } };
        case UPDATE_REVIEW:
            return { ...state, singleReview: { [action.payload.id]: action.payload } };
        case DELETE_REVIEW:
            const newReviews = { ...state.allReviews };
            delete newReviews[action.payload];
            return { ...state, allReviews: newReviews };
        default:
            return state;
    }
};

export default reviewReducer;


// // Get All Reviews Thunk
// export const getAllReviewsThunk = () => async (dispatch) => {
//     const response = await fetch('/api/reviews');
//     const reviews = await response.json();
//     dispatch(getAllReviewsAction(reviews));
//     return response;
// };
