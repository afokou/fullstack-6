import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests.js';
import NotificationContext from './NotificationContext.jsx';
import { useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const App = () => {
  const queryClient = useQueryClient()
  const [notification, dispatchNotification] = useReducer(notificationReducer, null)

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => {
        return oldAnecdotes.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      })
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
    dispatchNotification({ type: 'SET_NOTIFICATION', payload: `you voted '${anecdote.content}'` })
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
    }, 5000);
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service is not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
