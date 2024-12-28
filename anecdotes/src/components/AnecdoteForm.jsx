import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer.js';
import { createAnecdoteAction } from '../reducers/anecdoteReducer.js';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdoteAction(content))
    dispatch(setNotification(`you created '${content}'`, 5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm;
