import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotesService.js';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload)
      state.sort((a, b) => b.votes - a.votes)
    },
    voteAnecdote: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      anecdoteToVote.votes++
      state.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes: (state, action) => {
      action.payload.sort((a, b) => b.votes - a.votes)
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdoteAction = content => {
  return async dispatch => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch(createAnecdote(anecdote))
  }
}

export const voteAnecdoteAction = id => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    await anecdotesService.update(id, {
      ...anecdotes.find(a => a.id === id),
      votes: anecdotes.find(a => a.id === id).votes + 1
    })
    dispatch(voteAnecdote(id))
  }
}

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
