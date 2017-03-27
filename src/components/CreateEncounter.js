import React from 'react';
import { makeSlug } from '../helpers';

class CreateEncounter extends React.Component {
	constructor() {
		super();
		this.goToEncounter = this.goToEncounter.bind(this);
	}
	goToEncounter(event) {
		// stop default form behaviour
		event.preventDefault();

		// grab text from input
		const encounterName = this.encounterInput.value;
		const encounterNameSlug = makeSlug(encounterName);

		// go to /encounter/:encounterId
		this.context.router.transitionTo(`/encounter/${encounterNameSlug}`);
	}
	render() {
		return (
			<div>
				<h1>Create New Encounter</h1>
				<form onSubmit={this.goToEncounter} className="create-encounter">
					<input type="text" required placeholder="Encounter Name" ref={(input) => {this.encounterInput = input}} />
					<button type="submit">Create</button>
				</form>
			</div>
		)
	}
}

CreateEncounter.contextTypes = {
	router: React.PropTypes.object
}

export default CreateEncounter;