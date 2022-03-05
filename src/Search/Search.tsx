import React, { useState, useEffect } from 'react';
import { Stock, StockResult } from '../utils/types';
import { sanitizeProperties } from '../utils/utils';

export const Search: React.FC = ()  => {
	const [results, setResults] = useState<Stock[]>( [] );
	const [query, setQuery] = useState<string>( '' );
	
	useEffect( () => {
		if ( query.length ) {
			fetchStocks( query );
		}
	},[query] );

	const fetchStocks = ( keywords:string ) => {
		fetch( `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.REACT_APP_API_KEY}` )
			.then( ( response )=>response.json() )
			.then( ( json )=>{
				const results = json['bestMatches'].map( ( item: StockResult )=>{
					return sanitizeProperties( item );
				} );
				setResults( results );
			} )
			.catch( error=>console.log( `Error in fetch: ${error.message}` ) );
	};

	return ( 
		<div className='search-container'>
			<div className='search-container__search'>
				<input
					className='search-container__search-box'
					type='text'
					value={query}
					aria-label='Search stocks'
					onChange={( event )=>setQuery( event.target.value )}
				/> 
			</div>
		</div>
	);
};