const Filter = (props) => {

    return(

    <form>
        <div>
          filter shown with <input value = {props.filter}
            onChange = {props.handler}/>
        </div>
      </form>

    )

}

export default Filter