import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer.js';
import filterReducer from './reducers/filterReducer.js';
import notificationReducer from './reducers/notificationReducer.js';
import anecdotesService from './services/anecdotesService.js';

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  }
})

anecdotesService.getAll().then(anecdotes =>
  store.dispatch(setAnecdotes(anecdotes))
)

export default store;
