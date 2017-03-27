import React from 'react';
import { slugToTitle } from '../helpers';
import base from '../base';

import AddCombatant from './AddCombatant';
import Combatant from './Combatant';

class App extends React.Component {
	constructor() {
		super();

		this.addCombatant = this.addCombatant.bind(this);
		this.updateCombatant = this.updateCombatant.bind(this);
		this.removeCombatant = this.removeCombatant.bind(this);

		this.state = {
			combatants: {}
		}
	}

	componentWillMount() {
		// sync state to firebase
		this.ref = base.syncState(`${this.props.params.encounterNameSlug}/combatants`, {
			context: this,
			state: 'combatants'
		});
	}

	componentWillUnmount() {
		// stop syncing with firebase
		base.removeBinding(this.ref);
	}

	addCombatant(combatant) {
		// update our state
		const combatants = {...this.state.combatants};

		// add new combatant
		const timestamp = Date.now();
		combatants[`combatant-${timestamp}`] = combatant;

		// set state
		this.setState({combatants});
	}

	updateCombatant(index, updatedCombatant) {
		// get state
		const combatants = {...this.state.combatants};

		// update state
		combatants[index] = updatedCombatant;

		// set new state
		this.setState({combatants});
	}

	removeCombatant(index) {
		// get state
		const combatants = {...this.state.combatants};

		// set state item to null
		combatants[index] = null;

		// update state
		this.setState({combatants});
	}

	render() {
		// Order combatants by initiative
		const combatants = this.state.combatants;
		const comArray = Object.keys(combatants).map(function(value) {
			const newObj = combatants[value];
			newObj['index'] = value;
			return newObj;
		});
		const sortedCombatants = comArray.sort(function(a, b) {
			return parseFloat(b.init) - parseFloat(a.init);
		});

		return (
			<div>
				<h1 className="encounter-title">{slugToTitle(this.props.params.encounterNameSlug)}</h1>
				<table className="combatants-table">
					<tbody>
					<tr>
						<th></th>
						<th width="80">Initiative</th>
						<th>Name</th>
						<th width="80">Current<br />HP</th>
						<th width="80">Max<br />HP</th>
						<th>Death Saving Successes</th>
						<th>Death Saving Failures</th>
						<th>Condition</th>
						<th></th>
						<th width="30"></th>
					</tr>
					{	
						sortedCombatants.map(function(object, index) {
							return <Combatant key={object.index} index={object.index} details={object} updateCombatant={this.updateCombatant} removeCombatant={this.removeCombatant} combatants={this.state.combatants} />
						}, this)
					}
					</tbody>
				</table>
				<AddCombatant addCombatant={this.addCombatant} />
			</div>
		)
	}
}

export default App;