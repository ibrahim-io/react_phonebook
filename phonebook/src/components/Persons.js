import React from 'react'

const Persons = ({persons, deletePerson}) => {
  return (
    <ul>
        {persons.map(person =>
          <Person name={person.name} number={person.number} 
                  key={person.name} id={person.id} deletePerson={deletePerson} />  
        )}
      </ul>
  )
}

const Person = ({name, number, id, deletePerson}) => {
  return (
    <li>
      {name} - {number}
      <button onClick={() => deletePerson(id, name)}>Delete</button>
    </li>
  )
}

export default Persons