import axios from 'axios'
import { useEffect, useState } from 'react'


const Filter = ({value, handler}) => {
  return <div>
    filter shown with <input value={value} onChange={handler}></input>
    </div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  
  const addName = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName) !== undefined) {
        alert(`${newName} is already added to phonebook`)
        return
    }
    
    setPersons([...persons].concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App
