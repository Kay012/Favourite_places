import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesRuducer from './store/reducers/places';
import {init} from './helpers/db';

init().then(() => {
  console.log('Initialized Successfully')
}).catch((err) => {
  console.log('Initializing Database Failed')
  console.log(err)
})

const rootReducer = combineReducers({
  places: placesRuducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
        <PlacesNavigator />
    </Provider>
    )
}

