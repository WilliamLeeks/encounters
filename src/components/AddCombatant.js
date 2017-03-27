import React from 'react';

class AddCombatant extends React.Component {
	constructor() {
		super();
		this.createCombatant = this.createCombatant.bind(this);
	}

	createCombatant(event) {
		// prevent default form behaviour
		event.preventDefault();

		// create new combatant object
		const combatant = {
			type: this.type.value,
			init: this.init.value,
			name: this.name.value,
			currentHp: this.currentHp.value,
			maxHp: this.maxHp.value,
			condition: 'stable',
			deathSavingSuccesses: 0,
			deathSavingFailures: 0,
			lifeStatus: 'alive'
		}

		// add combatant to state
		this.props.addCombatant(combatant);

		// reset form
		this.combatantForm.reset();
	}

	render() {
		return (
			<form ref={(input) => this.combatantForm = input} onSubmit={this.createCombatant} className="create-combatant">
				<select ref={(input) => this.type = input}>
					<option value="PC">PC</option>
					<option value="NPC">NPC</option>
					<option value="Monster">Monster</option>
				</select>
				<input ref={(input) => this.init = input} type="number" placeholder="Initiative" />
				<input ref={(input) => this.name = input} type="text" placeholder="Name" />
				<input ref={(input) => this.currentHp = input} type="number" placeholder="Current HP"/>
				<input ref={(input) => this.maxHp = input} type="number" placeholder="Max HP"/>
				<button type="submit">Add Combatant</button>
			</form>
		)
	}
}

export default AddCombatant;