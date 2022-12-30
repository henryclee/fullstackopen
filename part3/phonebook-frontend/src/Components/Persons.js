const Persons = ({filter, persons, delPerson}) => {

    return (
        <div>
        {persons
            .filter(person => {
              return (person.name.toLowerCase().includes(filter.toLowerCase()))
              }
            )
            .map(person => 
              <div key = {person.id}>
              {person.name} {' '}
              {person.number} {' '}
              <button onClick = {() => delPerson(person)}>delete</button>
              </div>)}
        </div>
    )
}

export default Persons