const Numbers = (props) => {

    const persons = props.persons
    const filter = props.filter

    return (
        <ul>
        {persons
          .filter(person => {
            if (filter === '' || person.name.toLowerCase().startsWith(filter.toLowerCase())) {
              return true
            }
            else {
              return false
            }
          })
          .map(person => <li key = {person.name}>{person.name} {person.number}</li>)
        }
      </ul>
    )

}

export default Numbers