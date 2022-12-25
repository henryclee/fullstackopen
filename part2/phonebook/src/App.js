import { useState, useEffect } from 'react'
//import axios from 'axios'

import Filter from "./Components/Filter"
import PersonForm from "./Components/PersonForm"
import Persons from "./Components/Persons"

import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons
        .map(person => (person.name))
        .find(name => name === newName)){
      
      if (window.confirm(`${newName} is already added to phonebook,` +
        `replace the old number with a new one?`)){

        const oldPerson = persons.find(p => p.name === newName)
        const changedPerson = {...oldPerson, number: newNum}

        personService
          .updatePerson(changedPerson)
          .then(changedPerson => {
            const changedList = persons
              .filter(p => p.id < changedPerson.id)
              .concat(changedPerson)
              .concat(persons
                .filter(p => p.id > changedPerson.id))
            setPersons(changedList)
            setNewName('')
            setNewNum('')
          })
        }
    }
    else if (newName !== '') {

      const personObject = {name: newName, number: newNum}

      personService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
        })

    }
  }

  const delPerson = (person) => {

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          const newList = persons.filter(p =>(
            p.id !== person.id
          ))
          setPersons(newList)
        })
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
        delPerson = {delPerson}
      />
    </div>
  )
}

export default App