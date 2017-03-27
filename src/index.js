import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import CreateEncounter from './components/CreateEncounter';
import App from './components/App';
import NotFound from './components/NotFound';

import './styles.css';

// Router
const Root = () => {
	return (
		<BrowserRouter>
			 <div>
			 	<Match exactly pattern="/" component={CreateEncounter} />
			 	<Match pattern="/encounter/:encounterNameSlug" component={App} />
			 	<Miss component={NotFound} /> 
			 </div>
		</BrowserRouter>
	)
}

render(<Root/>, document.querySelector('#main'));