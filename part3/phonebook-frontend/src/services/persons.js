import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createPerson = (newObject) => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)

}

const updatePerson = (changedPerson) => {
    const request = axios.put(`${baseURL}/${changedPerson.id}`,changedPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    return (
    axios.delete(`${baseURL}/${id}`)
    )
}

const personMethods = {
    getAll,
    createPerson,
    updatePerson,
    deletePerson
}

export default personMethods