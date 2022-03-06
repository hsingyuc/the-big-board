import React, { useState } from 'react';
import './App.scss';
import { Search } from './Search/Search';
import { Stock } from './utils/types';

const App: React.FC = () => {
	const [selectedStocks, setSelectedStocks] = useState<Stock[]>( [] );

	return (
		<div className='stocks-container'>
			<h1>The big b<img src="bullinsuit.png" alt="Bull in suit" width="20" height="20"/>ard</h1>
			<h2>Stock Comparison</h2>
			<Search 
				onSelect={ ( selected ) => setSelectedStocks( [ ...selectedStocks, selected ] ) } 
				selected={ selectedStocks }
			/>
			<div className='cards-container'>
				Cards here
			</div>
		</div>  
	);
};
	
export default App;
	