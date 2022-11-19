import { useState } from 'react'

const Button = (props) => {
  return (
    
      <button onClick={props.handleClick}>
        {props.text}
      </button>
  
  )

}

const StatisticLine =(props) => {
  const {name,value} = props
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr> 
  )
}


const Statistics = (props) => {
  const {good,neutral,bad} = props

  if (good === 0 && neutral ===0 && bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticLine name = "good" value = {good} />
      <StatisticLine name = "neutral" value = {neutral} />
      <StatisticLine name = "bad" value = {bad} />
      <StatisticLine name = "all" value = {good+neutral+bad} />
      <StatisticLine name = "average" value = {(good + (-1*bad))/(good + neutral + bad)} />
      <StatisticLine name = "positive" value = {(100 * good / (good + neutral + bad)) + " %"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>

        <Button text = "good" handleClick = {() => {setGood(good+1)}} />
        <Button text = "neutral" handleClick = {() => {setNeutral(neutral+1)}} />
        <Button text = "bad" handleClick = {() => {setBad(bad+1)}} /> 

      </div> 

      <h1>statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App