

import { useState } from 'react'

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const increment = (amount, helper) => {
  return () => { 
    helper(amount+1)
  }
}

const StatisticLine = ({prefix, value, suffix=""}) => {
  return (
    <tr>
      <td>{prefix}</td>
      <td>{value}</td>
      <td>{suffix}</td>
    </tr>
  );
}

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0) {
      return <p>No feedback given</p>
  }
  return <table>
    <StatisticLine prefix="good" value={good}/>
    <StatisticLine prefix="neutral" value={neutral}/>
    <StatisticLine prefix="bad" value={bad}/>
    <StatisticLine prefix="all" value={good+neutral+bad}/>
    <StatisticLine prefix="average" value={(good+neutral*0+bad*-1)/(good+neutral+bad)}/>
    <StatisticLine prefix="positive" value={good/(good+neutral+bad)*100} suffix="%"/>
  </table>
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
        <Button onClick={increment(good, setGood)} text="good"/>
        <Button onClick={increment(neutral, setNeutral)} text="neutral"/>
        <Button onClick={increment(bad, setBad)} text="bad"/>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

