const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

//action is an object with a type property
// action creator is a function that return action.

//action
const buyCake = () => ({
  type: BUY_CAKE,
  info: 'First redux action',
});

const buyIceCream = () => ({
  type: BUY_ICECREAM,
});

// const initialState = {
//   numberOfCake: 10,
//   numberOfIceCreams: 20,
// };

const initialCakeState = {
  numberOfCake: 10,
};

const initialIceCreamState = {
  numberOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        numberOfCake: state.numberOfCake - 1,
      };
    default:
      return state;
  }
};

const IceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - 1,
      };
    default:
      return state;
  }
};

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         numberOfCake: state.numberOfCake - 1,
//       };
//     case BUY_ICECREAM:
//       return {
//         ...state,
//         numberOfIceCreams: state.numberOfIceCreams - 1,
//       };
//     default:
//       return state;
//   }
// };

// Creating a combined reducer to pass it to the store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: IceCreamReducer,
});

/* Application has only one store. Store responsibility is :
    1. Hold Application State.
    2.Allow access to the state. getState()
    3. Allow updating on the state. dispatch(action)
    4.Register listener via subscribe(listener)
    5. Handle unregister of listeners via a function returned by subscribe (listener);
*/

const store = createStore(rootReducer, applyMiddleware(logger));

console.log(`initial State`, store.getState());

const unsubscribe = store.subscribe(() =>
  console.log('Update State', store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
unsubscribe();
