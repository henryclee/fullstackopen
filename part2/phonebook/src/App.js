import { useState, useEffect } from 'react'

import Filter from "./Components/Filter"
import PersonForm from "./Components/PersonForm"
import Persons from "./Components/Persons"

import axios from 'axios'


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons
        .map(person => (person.name))
        .find(name => name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else if (newName !== '') {
      setPersons(persons.concat({name: newName, number: newNum}))
      setNewName('')
      setNewNum('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter = {filter} handler = {handleFilterChange}/>
      
      <h2>add a new</h2>
      
      <PersonForm 
        addPerson = {addPerson}
        newName = {newName}
        newNum = {newNum}
        nameHandler = {handleNameChange}
        numHandler = {handleNumChange}
      />

      <h2>Numbers</h2>
      
      <Persons
        persons = {persons}
        filter = {filter}
      />
    </div>
  )
}

export default App