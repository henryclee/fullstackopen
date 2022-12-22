const Persons = ({filter, persons}) => {

    return (
        <div>
        {persons
            .filter(person => {
              return (person.name.toLowerCase().includes(filter.toLowerCase()))
              }
            )
            .map(person => 
              <div key = {person.name}>
              {person.name} {person.number}
              </div>)}
        </div>
    )
}

export default Persons