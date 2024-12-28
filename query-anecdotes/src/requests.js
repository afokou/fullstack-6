import axios from 'axios'

export const getAnecdotes = axios.get('http://localhost:3001/anecdotes').then(res => res.data)

export const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0 }
  const res = await axios.post('http://localhost:3001/anecdotes', anecdote)
  return res.data
}

export const voteAnecdote = async (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const res = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, updatedAnecdote)
  return res.data
}
