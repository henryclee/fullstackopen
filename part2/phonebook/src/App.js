import { useState } from 'react'

import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'


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
      <Filter filter = {filter} eventHandler = {handleFilterChange} />
      
      <h3>Add a new</h3>

      <PersonForm 
        name = {newName}
        number = {newNumber}
        addName = {addName} 
        handleName = {handleNameChange}
        handleNumber = {handleNumberChange}        
      />

      <h3>Numbers</h3>

      <Numbers 
        persons = {persons}
        filter = {filter}
      />

    </div>
  )
}

export default App