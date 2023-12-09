import { useState } from 'react';

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
			<div>
				filter shown with <input value={filter} onChange={handleFilter} />
			</div>
			<form onSubmit={addPerson}>
				<h2>add a new</h2>
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
			<h2>Numbers</h2>
			<ul>
				{personsToDisplay.map(person => (
					<li key={person.id}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
