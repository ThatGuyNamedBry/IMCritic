//                                           Action Types
const LOAD_ACTORS = 'actors/LOAD_ACTORS';
const LOAD_ACTOR = 'actors/LOAD_ACTOR';
const CREATE_ACTOR = 'actors/CREATE_ACTOR';
const UPDATE_ACTOR = 'actors/UPDATE_ACTOR';
const DELETE_ACTOR = 'actors/DELETE_ACTOR';


//                                         Action Creators

//Get All Actors Action
export const getAllActorsAction = (actors) => {
  return {
    type: LOAD_ACTORS,
    payload: actors,
  };
};

//Get Actor by ID Action
export const getActorByIdAction = (actor) => {
  return {
    type: LOAD_ACTOR,
    payload: actor,
  };
};

//Create Actor Action
export const createActorAction = (actor) => {
  return {
    type: CREATE_ACTOR,
    payload: actor,
  };
};


// Edit/Update a Actor Action
export const updateActorAction = (actor) => {
  return {
    type: UPDATE_ACTOR,
    payload: actor,
  };
};

//Delete a Actor Action
export const deleteActorAction = (actorId) => {
  return {
    type: DELETE_ACTOR,
    payload: actorId,
  };
};

//                                             Thunks
//Get All Actors Thunk
export const getAllActorsThunk = () => async (dispatch) => {
  const response = await fetch('/api/actors');
  const actors = await response.json();
  dispatch(getAllActorsAction(actors));
  return response;
};

//Get All Actors by Current User Thunk
export const getCurrentUserAllActorsThunk = () => async (dispatch) => {
  const response = await fetch('/api/actors/current');
  if (response.ok) {
    const actors = await response.json();
    dispatch(getAllActorsAction(actors));
    return actors;
  }
};

//Get Actor by ID Thunk
export const getActorByIdThunk = (actorId) => async (dispatch) => {
  const response = await fetch(`/api/actors/${actorId}`);
  if (response.ok) {
    const actor = await response.json();
    dispatch(getActorByIdAction(actor));
    return actor;
  }
};

//Create an Actor Thunk
export const createActorThunk = (formData) => async (dispatch) => {
  // console.log('Create actor thunk running, this is the formData', formData)

  const response = await fetch('/api/actors/newActor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    // console.log('After fetch, this is the response', response)
  });
  if (response.ok) {
    const newActor = await response.json();
    return dispatch(createActorAction(newActor))
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

//Edit/Update an Actor Thunk
export const updateActorThunk = (actor, formData) => async (dispatch) => {
  // console.log('Edit/Update an actor Thunk, this is actor  ', actor);
  const response = await fetch(`/api/actors/edit/${actor.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    // console.log('After fetch, this is the response', response)
  });
  if (response.ok) {
    const updatedActor = await response.json();
    return dispatch(updateActorAction(updatedActor))
  } else {
    const errorData = await response.json();
    return errorData;
  }

}

//Delete an Actor Thunk
export const deleteActorThunk = (actorId) => async (dispatch) => {
  const response = await fetch(`/api/actors/${actorId}/delete`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteActorAction(actorId));
    return response;
  }
};


//Reducer function
const initialState = {
  allActors: {},
  singleActor: {}
}

const actorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ACTORS:
      // console.log(action.payload);
      const allActorsObject = {};
      action.payload.forEach((actor) => {
        allActorsObject[actor.id] = actor;
      });
      return { ...state, allActors: allActorsObject };
    case LOAD_ACTOR:
      return { ...state, singleActor: { [action.payload.id]: action.payload } };
    case CREATE_ACTOR:
      return { ...state, allActors: { ...state.allActors, [action.payload.id]: action.payload } };
    case UPDATE_ACTOR:
      return { ...state, singleActor: { [action.payload.id]: action.payload } };
    case DELETE_ACTOR:
      const newActors = { ...state.allActors };
      delete newActors[action.payload];
      return { ...state, allActors: newActors };
    default:
      return state;
  }
};

export default actorReducer;
