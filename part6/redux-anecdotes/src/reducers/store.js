import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'

const storeReducer = {
 reducer: {
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
 }
}

export default storeReducer