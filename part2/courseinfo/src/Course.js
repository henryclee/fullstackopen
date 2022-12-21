const Course = ({courses}) => {
    return (
      courses.map(course => {
        return(
        <div key = {course.name}>
          <h2>{course.name}</h2>
          {course.parts.map(part=>
            <p key = {part.name}>
              {part.name} {part.exercises}
            </p>
          )}
          <b>total of {course.parts
            .map(part => parseInt(part.exercises))
            .reduce((acc,curr) =>
              acc + curr)
            } exercises
          </b>
        </div>
        )
      })
    )
  }

/*
const OneCourse = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part=>
        <p key = {part.name}>
          {part.name} {part.exercises}
        </p>
      )}
      <b>total of {course.parts
        .map(part => parseInt(part.exercises))
        .reduce((acc, curr) =>
          acc + curr)
        } exercises</b>
    </div>
  )
}

const Course2 = ({courses}) => {
  return (
    courses.map(course =>
      <OneCourse key =  {course.name} course = {course}/>
      )
  )
}
*/

  export default Course