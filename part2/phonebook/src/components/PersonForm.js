const PersonForm = (props) => {
    
    const newName = props.name
    const newNumber = props.number
    const addName = props.addName
    const handleNameChange = props.handleName
    const handleNumberChange = props.handleNumber

    return (
        <form onSubmit = {addName}>
        <div>
          name: <input 
            value = {newName}
            onChange = {handleNameChange}
          />
        </div>
        <div>
          number: <input
            value = {newNumber}
            onChange = {handleNumberChange}          
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )

}

export default PersonForm