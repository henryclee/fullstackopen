import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { changeNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
    const anecdote = anecdotes.find(a => a.id === id).content
    dispatch(changeNotification(`you voted for '${anecdote}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    },5000)
  }

  return (
    <div>
      {anecdotes
        .filter(anecdote => {
          return(anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        })
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
    
  )



}

export default AnecdoteList