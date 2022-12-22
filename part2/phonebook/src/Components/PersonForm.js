const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <div>
            name: <input value = {props.newName} 
                onChange = {props.nameHandler}/>
            </div>
            <div>
            number: <input value = {props.newNum} 
                onChange = {props.numHandler} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm