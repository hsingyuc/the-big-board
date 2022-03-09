import React, { useEffect, useState } from 'react';
import './App.scss';
import { Search } from './Search/Search';
import { Card } from './Card/Card';
import { Stock, StockQuote, StockQuotes } from './utils/types';
import { sanitizeProperties } from './utils/utils';
import { RemoveButton } from './RemoveButton/RemoveButton';
import { QuoteInfo } from './QuoteInfo/QuoteInfo';
import { Spinner } from './utils/Spinner';

const App: React.FC = () => {
	const [selectedStocks, setSelectedStocks] = useState<Stock[]>( [] );
	const [stockQuotes, setStockQuotes] = useState<StockQuotes>( {} );
	
	useEffect( ()=>{
		if ( selectedStocks.length ) {
			fetchQuote();
		}
	},[selectedStocks] );
	
	const fetchQuote = () => {
		selectedStocks.forEach( ( selectedStock ) => {
			const stock = selectedStock.symbol;
			if ( ! stockQuotes[ stock ] ) {
				fetch( `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${process.env.REACT_APP_API_KEY}` )
					.then( ( response )=>response.json() )
					.then( ( json )=>{
						if ( ! json['Global Quote'] ) {
							return;
						}

						const newStockQuotes = {...stockQuotes};
						const data = json['Global Quote'];
						const sanitizedData = sanitizeProperties( data );
						newStockQuotes[stock] = sanitizedData as StockQuote;
						setStockQuotes( newStockQuotes );
					} )
					.catch( ( error: Error )=> {
						console.log( `Error in fetch: ${error.message}` );
					} );
			}
		} );
	};

	return (
		<div className='stocks-container'>
			<h1>The big b<img src="bullinsuit.png" alt="Bull in suit" width="20" height="20"/>ard</h1>
			<h2>Stock Comparison</h2>
			<Search 
				onSelect={ ( selected ) => setSelectedStocks( [ ...selectedStocks, selected ] ) } 
				isDisabled={ Object.keys( selectedStocks ).length >= 3 }
				selected={ selectedStocks }
			/>
			<div className='cards-container'>
				{ 
					[0,1,2].map( ( index ) => {
						const stock = selectedStocks[index]?.symbol;

						if ( ! stock ) {
							return (
								<Card key={ index } isEmpty>
									Pick an additional stock symbol in the search box above to display stock information
								</Card>
							);
						}

						if ( ! stockQuotes[stock] ) {
							return (
								<Card key={ index } isEmpty>
									<Spinner />
								</Card>
							);
						}

						return (
							<Card key={ index }>
								<h3>{ selectedStocks[index]?.name }</h3>
								{ stockQuotes[stock] && <QuoteInfo quote={ stockQuotes[stock]} /> }
								<RemoveButton onRemove={() => {
									setSelectedStocks( selectedStocks.filter( s => s.symbol !== stock ) );
								}} />
							</Card>
						); 
					} )
				}
			</div>
		</div>  
	);
};
	
export default App;
	