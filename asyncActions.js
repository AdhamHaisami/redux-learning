const redux = require('redux');
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const createStore = redux.createStore;

const initialState = {
  loading: false,
  users: [],
  error: '',
};

//actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//actionCreators
const fetchUserRequest = () => ({
  type: FETCH_USERS_REQUEST,
});
const fetchUserSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
const fetchUserFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

// Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        //response.data is the array of users
        const users = response.data.map((user) => user.id);
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        //error.message is the error of description
        dispatch(fetchUserFailure(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
