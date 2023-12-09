import { useState } from 'react';

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

const Persons = ({ personsToDisplay }) => {
	return (
		<ul>
			{personsToDisplay.map(person => (
				<li key={person.id}>
					{person.name} {person.number}
				</li>
			))}
		</ul>
	);
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);

	const [newPerson, setNewPerson] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

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

		setPersons(persons.concat(personObject));
		setNewPerson('');
		setNewNumber('');
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
			<Persons personsToDisplay={personsToDisplay} />
		</div>
	);
};

export default App;
