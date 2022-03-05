import React from 'react';
import './App.scss';

const App: React.FC = () => {
	return (
		<div className='stocks-container'>
			<h1>The big b<img src="bullinsuit.png" alt="Bull in suit" width="20" height="20"/>ard</h1>
			<h2>Stock Comparison</h2>
			Search here
			<div className='cards-container'>
				Cards here
			</div>
		</div>  
	);
};
	
export default App;
	