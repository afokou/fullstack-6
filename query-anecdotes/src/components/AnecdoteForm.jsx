import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests.js';
import NotificationContext from '../NotificationContext.jsx';
import { useContext } from 'react';

const AnecdoteForm = () => {
  const [_, dispatchNotification] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => [...oldAnecdotes, newAnecdote])
    },
    onError: (error) => {
      dispatchNotification({ type: 'SET_NOTIFICATION', payload: error.response.data.error })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    dispatchNotification({ type: 'SET_NOTIFICATION', payload: `new anecdote '${content}' created` })
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
    }, 5000);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
