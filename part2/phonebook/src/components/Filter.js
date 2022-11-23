const Filter = ({filter, eventHandler}) => {
    return (
      <div>
        filter shown with 
        <input
          value = {filter}
          onChange = {eventHandler} 
        />
      </div>
    )
}

export default Filter