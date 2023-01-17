import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice ({
  name: 'notification',
  initialState: '',
  reducers: {
    clearNotification (state, action) {
      return ''
    },
    changeNotification (state, action) {
      return (action.payload)
    }
  }
})

export const { clearNotification, changeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(changeNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
  }
}


export default notificationSlice.reducer