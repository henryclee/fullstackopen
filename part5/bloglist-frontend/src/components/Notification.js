const Notification = ({notification}) => {

  if (notification[0] === '') {
    return null
  }

  const notificationStyle = {
    color: notification[1],
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style = {notificationStyle}>
      {notification[0]}
    </div>
  )
}

export default Notification
