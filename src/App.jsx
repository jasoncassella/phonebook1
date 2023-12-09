import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{
			id: 1,
			name: 'Arto Hellas',
			number: '040-1234567',
		},
	]);
	const [newPerson, setNewPerson] = useState('');
	const [newNumber, setNewNumber] = useState('');

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
	};

	const handlePersonChange = event => {
		setNewPerson(event.target.value);
	};

	const handleNumberChange = event => {
		setNewNumber(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
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
				{persons.map(person => (
					<li key={person.id}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
