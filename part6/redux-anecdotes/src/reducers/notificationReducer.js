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
export default notificationSlice.reducer