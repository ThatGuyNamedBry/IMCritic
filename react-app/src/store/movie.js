//                                           Action Types
const LOAD_MOVIES = 'movies/LOAD_MOVIES';
const LOAD_MOVIE = 'movies/LOAD_MOVIE';
const CREATE_MOVIE = 'movies/CREATE_MOVIE';
const UPDATE_MOVIE = 'movies/UPDATE_MOVIE';
const DELETE_MOVIE = 'movies/DELETE_MOVIE';


//                                         Action Creators

//Get All Movies Action
export const getAllMoviesAction = (movies) => {
  return {
    type: LOAD_MOVIES,
    payload: movies,
  };
};

//Get Movie by ID Action
export const getMovieByIdAction = (movie) => {
  return {
    type: LOAD_MOVIE,
    payload: movie,
  };
};

//Create Movie Action
export const createMovieAction = (movie) => {
  return {
    type: CREATE_MOVIE,
    payload: movie,
  };
};


// Edit/Update a Movie Action
export const updateMovieAction = (movie) => {
  return {
    type: UPDATE_MOVIE,
    payload: movie,
  };
};

//Delete a Movie Action
export const deleteMovieAction = (movieId) => {
  return {
    type: DELETE_MOVIE,
    payload: movieId,
  };
};

//                                             Thunks
//Get All Movies Thunk
export const getAllMoviesThunk = () => async (dispatch) => {
  const response = await fetch('/api/movies');
  const movies = await response.json();
  dispatch(getAllMoviesAction(movies));
  return response;
};

//Get All Movies by Current User Thunk
export const getCurrentUserAllMoviesThunk = () => async (dispatch) => {
  const response = await fetch('/api/movies/current');
  if (response.ok) {
    const movies = await response.json();
    dispatch(getAllMoviesAction(movies));
    return movies;
  }
};

//Get Movie by ID Thunk
export const getMovieByIdThunk = (movieId) => async (dispatch) => {
  const response = await fetch(`/api/movies/${movieId}`);
  if (response.ok) {
    const movie = await response.json();
    dispatch(getMovieByIdAction(movie));
    return movie;
  }
};

//Create an Movie Thunk
export const createMovieThunk = (formData) => async (dispatch) => {
  // console.log('Create movie thunk running, this is the formData', formData)

  const response = await fetch('/api/movies/newMovie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    // console.log('After fetch, this is the response', response)
  });
  if (response.ok) {
    const newMovie = await response.json();
    return dispatch(createMovieAction(newMovie))
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

//Edit/Update an Movie Thunk
export const updateMovieThunk = (movie, formData) => async (dispatch) => {
  // console.log('Edit/Update an movie Thunk, this is movie  ', movie);
  const response = await fetch(`/api/movies/edit/${movie.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    // console.log('After fetch, this is the response', response)
  });
  if (response.ok) {
    const updatedMovie = await response.json();
    return dispatch(updateMovieAction(updatedMovie))
  } else {
    const errorData = await response.json();
    return errorData;
  }

}

//Delete an Movie Thunk
export const deleteMovieThunk = (movieId) => async (dispatch) => {
  const response = await fetch(`/api/movies/${movieId}/delete`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteMovieAction(movieId));
    return response;
  }
};


//Reducer function
const initialState = {
  allMovies: {},
  singleMovie: {}
}

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MOVIES:
      // console.log(action.payload);
      const allMoviesObject = {};
      action.payload.forEach((movie) => {
        allMoviesObject[movie.id] = movie;
      });
      return { ...state, allMovies: allMoviesObject };
    case LOAD_MOVIE:
      return { ...state, singleMovie: { [action.payload.id]: action.payload } };
    case CREATE_MOVIE:
      return { ...state, allMovies: { ...state.allMovies, [action.payload.id]: action.payload } };
    case UPDATE_MOVIE:
      return { ...state, singleMovie: { [action.payload.id]: action.payload } };
    case DELETE_MOVIE:
      const newMovies = { ...state.allMovies };
      delete newMovies[action.payload];
      return { ...state, allMovies: newMovies };
    default:
      return state;
  }
};

export default movieReducer;
