import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {

    
    dispatch(addVote(anecdote))
    const content = anecdote.content

    dispatch(setNotification(`you voted for '${content}'`, 2))
  
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
    
  )



}

export default AnecdoteList