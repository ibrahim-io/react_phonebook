import { useState } from 'react'

const Person = ({name}) => {
  return (
    <li>{name}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    for(let i=0; i < persons.length; i++) {
      if(persons[i].name === newName) {
        window.alert(`${newName} is already a name found in the phonebook`)
        setNewName('')
        return
      }
    }
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person name={person.name} key={person.name} />  
        )}
      </ul>
    </>
  )
}

export default App;
