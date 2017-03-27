import React from 'react';

class Combatant extends React.Component {
	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e, index) {
		// find changed combatant
		const combatant = this.props.combatants[index];

		// take a copy and update with new data
		const updatedCombatant = {
			...combatant,
			[e.target.name]: e.target.value
		}

		// check if current HP is greater than max, and ensure not
		if(updatedCombatant.currentHp > updatedCombatant.maxHp) {
			updatedCombatant.currentHp = updatedCombatant.maxHp;
		}

		// update state with updated fish
		this.props.updateCombatant(index, updatedCombatant);
	}

	render() {
		const details = this.props.details;
		const dssIncrement = (parseInt(details.deathSavingSuccesses) <= 2 ? parseInt(details.deathSavingSuccesses) + 1 : 3);
		const dssDecrement = (parseInt(details.deathSavingSuccesses) >=1 ? parseInt(details.deathSavingSuccesses) - 1 : 0);
		const dsfIncrement = (parseInt(details.deathSavingFailures) <= 2 ? parseInt(details.deathSavingFailures) + 1 : 3);
		const dsfDecrement = (parseInt(details.deathSavingFailures) >=1 ? parseInt(details.deathSavingFailures) - 1 : 0);
		const newLifeStatus = (details.lifeStatus === 'alive' ? 'dead' : 'alive');
		
		return (
			<tr key={details.index} className={(details.lifeStatus === 'alive' ? 'combatant-row' : 'combatant-row-dead')}>
				<td className="combatant-type">{details.type}</td>
				<td width="80">{details.init}</td>
				<td>{details.name}</td>
				<td width="80" className="current-hp-cell">
					<input className="current-hp" type="text" name="currentHp" value={details.currentHp} onChange={(e) => this.handleChange(e, details.index)} />
				</td>
				<td width="80">{details.maxHp}</td>
				{ 
					details.type === 'Monster' ? (
						<td></td>
					) : (
						<td><button className="increment-button" name="deathSavingSuccesses" value={dssDecrement} onClick={(e) => this.handleChange(e, details.index)}>&ndash;</button><span className="spacer">{details.deathSavingSuccesses}</span><button className="increment-button" name="deathSavingSuccesses" value={dssIncrement} onClick={(e) => this.handleChange(e, details.index)}>&#43;</button></td>
					)
				}
				{ 
					details.type === 'Monster' ? (
						<td></td>
					) : (
						<td><button className="increment-button" name="deathSavingFailures" value={dsfDecrement} onClick={(e) => this.handleChange(e, details.index)}>&ndash;</button><span className="spacer">{details.deathSavingFailures}</span><button className="increment-button" name="deathSavingFailures" value={dsfIncrement} onClick={(e) => this.handleChange(e, details.index)}>&#43;</button></td>
					)
				}
				<td>
					<select name="condition" value={details.condition} onChange={(e) => this.handleChange(e, details.index)}>
						<option value="stable">Stable</option>
						<option value="blinded">Blinded</option>
						<option value="charmed">Charmed</option>
						<option value="deafened">Deafened</option>
						<option value="fatigued">Fatigued</option>
						<option value="frightened">Frightened</option>
						<option value="grappled">Grappled</option>
						<option value="incapacitated">Incapacitated</option>
						<option value="invisible">Invisible</option>
						<option value="paralyzed">Paralyzed</option>
						<option value="petrified">Petrified</option>
						<option value="poisoned">Poisoned</option>
						<option value="prone">Prone</option>
						<option value="restrained">Restrained</option>
						<option value="stunned">Stunned</option>
						<option value="unconscious">Unconscious</option>
					</select>
				</td>
				<td>
					<button className="death-button" name="lifeStatus" value={newLifeStatus} onClick={(e) => this.handleChange(e, details.index)}>
						Toggle Life Status
					</button>
				</td>
				<td width="30"><button className="delete-combatant" onClick={() => this.props.removeCombatant(details.index)}>&times;</button></td>
			</tr>
		)
	}
}

export default Combatant;