import { useState } from 'react'

const Person = ({name, number}) => {
  return (
    <li>
      {name} - {number}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '07928847583' 
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person name={person.name} number={person.number} key={person.name} />  
        )}
      </ul>
    </>
  )
}

export default App;
