import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => axios.get('http://localhost:3002/persons').then(response => {
    setPersons(response.data)
  }), [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
    setPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
  }

  const addPerson = (event) => {
    event.preventDefault()
    for(let i=0; i < persons.length; i++) {
      if(persons[i].name === newName) {
        window.alert(`${newName} is already a name found in the phonebook`)
        setNewName('')
        return
      } else if (persons[i].number === newNumber) {
        window.alert(`${newNumber} is already a number found in the phonebook`)
        setNewNumber('')
        return
      }
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilter={handleFilter} />
      <h2>Add a new person</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} /> 
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </>
  )
}

export default App;
