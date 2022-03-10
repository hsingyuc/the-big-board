import React, { useState } from 'react';
import './App.scss';
import { Search } from './Search/Search';
import { Stock} from './utils/types';
import { StockCards } from './StockCards/StockCards';

const App: React.FC = () => {
	const [selectedStocks, setSelectedStocks] = useState<Stock[]>( [] );

	return (
		<div className='app'>
			<h1>The big b<img src="bullinsuit.png" alt="Bull in suit" width="20" height="20"/>ard</h1>
			<h2>Stock Comparison</h2>
			<Search 
				onSelect={ ( selected ) => setSelectedStocks( [ ...selectedStocks, selected ] ) } 
				isDisabled={ Object.keys( selectedStocks ).length >= 3 }
				selected={ selectedStocks }
			/>
			<StockCards
				selectedStocks={ selectedStocks }
				onRemove={ ( stock: string ) => setSelectedStocks( selectedStocks.filter( s => s.symbol !== stock ) ) }
			/>
		</div>  
	);
};
	
export default App;
	