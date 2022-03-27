import { useEffect, useState } from 'react'
import personService from './persons'


const Filter = ({value, handler}) => {
  return <div>
    filter shown with <input value={value} onChange={handler}></input>
    </div>
}

const Notification = ({ message }) => {
  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }
  if (message === '') {
    return null
  }

  return (
    <div className='notification' 
      style={style}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);
  
  const addName = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName) !== undefined) {
        alert(`${newName} is already added to phonebook`)
        return
    }
    
    const newPerson = {name: newName, number: newNumber}
    personService.create(newPerson)
      .then(() => {
        setPersons([...persons].concat(newPerson))
        setNewName('')
        setNewNumber('')

        setNotification(`Added ${newName}`)
        setTimeout(()=> {
          setNotification(``)
        }, 5000)
      })
  }

  const removePerson = (p) => {
    return () => {
      if (window.confirm(`Delete ${p.name}?`)) {
        personService.remove(p.id)
          .then(() => {
            setPersons(persons.filter(other => other.id !== p.id))
          })
      }
    }
  }

  const handleNameChange = (ev) => {
    setNewName(ev.target.value)
  }
  const handleNumberChange = (ev) => {
    setNewNumber(ev.target.value)
  }
  const handleFilterChange = (ev) => {
    setNewFilter(ev.target.value)
  }

  const personsToShow = persons.filter(p => p.name.startsWith(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter value={newFilter} handler={handleFilterChange}/>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {personsToShow.map((p) => (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.number}</td>
              <td><button onClick={removePerson(p)}>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App
