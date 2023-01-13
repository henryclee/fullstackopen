import Notification from './Notification'

const LoginForm = ({
  notification,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification notification ={notification}/>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            id = "username"
            type = "text"
            value = {username}
            name = "Username"
            onChange = {({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id = "password"
            type = "password"
            value = {password}
            name = "Password"
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <button id = "login-button" type = "submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm