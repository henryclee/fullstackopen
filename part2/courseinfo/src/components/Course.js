const Sum = (parts) => {
    return (
        parts.reduce((sum,part) => (sum + part.exercises),0)
    )
}

const Course = ({course}) => {

    return (
        <div>
            <h1>{course.name}</h1>

            {course.parts.map(part =>
                <p key = {part.id}>{part.name} {part.exercises}</p>)}
            
            <b>total of {Sum(course.parts)} exercises </b>
        </div>
        
    )

}

export default Course