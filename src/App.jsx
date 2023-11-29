import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{
			id: 1,
			name: 'Arto Hellas',
		},
	]);
	const [newPerson, setNewPerson] = useState('');

	const addPerson = event => {
		event.preventDefault();
		const personObject = {
			id: persons.length + 1,
			name: newPerson,
		};

		// this is a start. i need to check if a persons name is already in the phonebook
		// before i add it to the list. and if it is i notify the user and dont add it
		console.log(personObject.name);
		persons.forEach(person => console.log(person.name));

		setPersons(persons.concat(personObject));
		setNewPerson('');
	};

	const handlePersonChange = event => {
		setNewPerson(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newPerson} onChange={handlePersonChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map(person => (
					<li key={person.id}>{person.name}</li>
				))}
			</ul>
		</div>
	);
};

export default App;
