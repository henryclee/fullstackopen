import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '123-123-1234'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.filter(person => (person.name === newName)).length === 1) {
      window.alert(`${newName} is already aded to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with 
        <input
          value = {filter}
          onChange = {handleFilterChange} 
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit = {addName}>
        <div>
          name: <input 
            value = {newName}
            onChange = {handleNameChange}
          />
        </div>
        <div>
          number: <input
            value = {newNumber}
            onChange = {handleNumberChange}          
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter(person => {
            if (filter === '' || person.name.toLowerCase().startsWith(filter.toLowerCase())) {
              return true
            }
            else {
              return false
            }
          })
          .map(person => <li key = {person.name}>{person.name} {person.number}</li>)
        }
      </ul>
    </div>
  )
}

export default App