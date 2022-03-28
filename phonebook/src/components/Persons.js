import React from 'react'

const Persons = ({persons}) => {
  return (
    <ul>
        {persons.map(person =>
          <Person name={person.name} number={person.number} key={person.name} />  
        )}
      </ul>
  )
}

const Person = ({name, number}) => {
  return (
    <li>
      {name} - {number}
    </li>
  )
}

export default Persons