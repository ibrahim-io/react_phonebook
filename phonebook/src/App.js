import { useState } from 'react'

const Person = ({name}) => {
  return (
    <li>{name}</li>
  )
}

const App = () => {
  let id = 1
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person name={person.name} key={id++} />  
        )}
      </ul>
    </>
  )
}

export default App;
