import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote (state, action) {
      const id = action.payload
      const anecToChange = state.find(a => a.id === id)
      const changedAnec = {...anecToChange, votes: anecToChange.votes + 1}
      return state
        .map(a => a.id !== id ? a : changedAnec)
        .sort((a,b) => a.votes > b.votes ? -1 : 1)
    },
    addAnecdote (state, action) {           
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

