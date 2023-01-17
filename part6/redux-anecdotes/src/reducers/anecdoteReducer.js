import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    changeVote (state, action) {
      const id = action.payload
      const anecToChange = state.find(a => a.id === id)
      const changedAnec = {...anecToChange, votes: anecToChange.votes + 1}
      return state
        .map(a => a.id !== id ? a : changedAnec)
        .sort((a,b) => a.votes > b.votes ? -1 : 1)
    },
    appendAnecdote (state, action) {           
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { changeVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const addedAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(addedAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.incrementVote(anecdote)
    dispatch(changeVote(changedAnecdote.id))
  }
}



export default anecdoteSlice.reducer

