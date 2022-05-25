import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [successNotif, setSuccessNotif] = useState('')
  const [errorNotif, setErrorNotif] = useState('')
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => personService.getAll().then(response => {
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
        const message = `${newName} is already added to the phonebook, replace the old number with a new one?`
        if(window.confirm(message)) {
          const changedPerson = { ...persons[i], number: newNumber}
          personService
            .update(persons[i].id,changedPerson)
            .then(response => {
              setPersons(persons.map(p => p.id !== persons[i].id ? p : response.data))
            }).catch(err => {
              setErrorNotif(`Information of ${newName} has been removed from our server`)
            })
            setTimeout(() => {
              setErrorNotif('')
            }, 5000)
            setNewName('')
            setNewNumber('')
            return
        }
      } else if (persons[i].number === newNumber) {
        window.alert(`${newNumber} is already a number found in the phonebook`)
        setNewNumber('')
        return
      }
    }
    const personObj = {name: newName, number: newNumber}
    personService.create(personObj).then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
    setSuccessNotif(`Added ${newName}`)
    setTimeout(() => {
      setSuccessNotif('')
    }, 5000)
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      axios.delete(`http://localhost:3002/persons/${id}`).then(response => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={successNotif} notifType="success_notif" />
      <Notification message={errorNotif} notifType="error_notif" />
      <Filter filterName={filterName} handleFilter={handleFilter} />
      <h2>Add a new person</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} /> 
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </>
  )
}

export default App;
