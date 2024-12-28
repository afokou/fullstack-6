import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdoteAction } from '../reducers/anecdoteReducer.js';
import { setNotification } from '../reducers/notificationReducer.js';
import { useCallback } from 'react';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })
  const dispatch = useDispatch()

  const vote = useCallback(async (id) => {
    dispatch(voteAnecdoteAction(id))
    dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`, 5))
  }, [anecdotes, dispatch])

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList;
