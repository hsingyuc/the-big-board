import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Dropdown } from './Dropdown';
import { Stock, StockResult } from '../utils/types';
import { debounce, sanitizeProperties } from '../utils/utils';

export type SearchProps = {
	onSelect: ( selected: Stock ) => void;
}

export const Search: React.FC<SearchProps> = ( {onSelect} )  => {
	const [results, setResults] = useState<Stock[]>( [] );
	const [query, setQuery] = useState<string>( '' );
	const [isOpen, setIsOpen] = useState<boolean>( false );
	const selectBoxRef = useRef<HTMLInputElement>( null );
	
	useEffect( () => {
		if ( query.length ) {
			debouncedFetchStocks( query );
		}
	},[query] );

	useEffect( () => {
		if ( ! isOpen ) {
			return;
		}

		const handleCurrentTarget = ( e: MouseEvent | TouchEvent ) => {
			if ( ! selectBoxRef.current?.contains( e.target as Node ) ) {
				setQuery( '' );
				setIsOpen( false );
			}
		};

		document.addEventListener( 'click', handleCurrentTarget );
		return () => document.removeEventListener( 'click', handleCurrentTarget );
	}, [isOpen] );

	const fetchStocks = ( keywords:string ) => {
		fetch( `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.REACT_APP_API_KEY}` )
			.then( ( response )=>response.json() )
			.then( ( json )=>{
				const results = json['bestMatches'].map( ( item: StockResult )=>{
					return sanitizeProperties( item );
				} );
				setResults( results );
				setIsOpen( true );
			} )
			.catch( error=>console.log( `Error in fetch: ${error.message}` ) );
	};
	
	const debouncedFetchStocks = useCallback( debounce( fetchStocks ), [] );

	return ( 
		<div className='search-container' ref={selectBoxRef}>
			<div className='search-container__search'>
				<input
					className='search-container__search-box'
					type='text'
					value={query}
					aria-label='Search stocks'
					onChange={( event )=>setQuery( event.target.value )}
				/> 
				{ isOpen && <Dropdown 
					options={results} 
					onSelect={onSelect} 
				/>}
			</div>
		</div>
	);
};