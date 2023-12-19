import { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = ({ filter, handleFilter }) => {
	return (
		<div>
			filter shown with <input value={filter} onChange={handleFilter} />
		</div>
	);
};

const PersonForm = ({
	addPerson,
	newPerson,
	handlePersonChange,
	newNumber,
	handleNumberChange,
}) => {
	return (
		<form onSubmit={addPerson}>
			<h3>add a new</h3>
			<div>
				name: <input value={newPerson} onChange={handlePersonChange} />
			</div>
			<div>
				number: <input value={newNumber} onChange={handleNumberChange} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

const Persons = ({ personsToDisplay, handleDeleteNumber }) => {
	return (
		<ul>
			{personsToDisplay.map(person => (
				<li key={person.id}>
					{person.name} {person.number}
					<button onClick={() => handleDeleteNumber(person.id)}>delete</button>
				</li>
			))}
		</ul>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newPerson, setNewPerson] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then(response => {
			setPersons(response.data);
		});
	}, []);

	const personsToDisplay = filter
		? persons.filter(person => person.name.toLowerCase().includes(filter))
		: persons;

	const addPerson = event => {
		event.preventDefault();
		const personObject = {
			id: persons.length + 1,
			name: newPerson,
			number: newNumber,
		};

		if (persons.some(person => person.name === newPerson)) {
			alert(`${newPerson} is already added to phonebook`);
			return;
		}

		axios.post('http://localhost:3001/persons', personObject).then(response => {
			setPersons(persons.concat(personObject));
			setNewPerson('');
			setNewNumber('');
		});
	};

	const handlePersonChange = event => {
		setNewPerson(event.target.value);
	};

	const handleNumberChange = event => {
		setNewNumber(event.target.value);
	};

	const handleFilter = event => {
		setFilter(event.target.value);
	};

	const handleDeleteNumber = id => {
		axios
			.delete(`http://localhost:3001/persons/${id}`)
			.then(setPersons(persons.filter(person => person.id !== id)))
			.catch(error => console.error(error));
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} handleFilter={handleFilter} />
			<PersonForm
				addPerson={addPerson}
				newPerson={newPerson}
				handlePersonChange={handlePersonChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h3>numbers</h3>
			<Persons
				personsToDisplay={personsToDisplay}
				handleDeleteNumber={handleDeleteNumber}
			/>
		</div>
	);
};

export default App;
