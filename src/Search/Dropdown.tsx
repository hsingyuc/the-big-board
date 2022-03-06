import React, { useMemo } from 'react';
import { Stock } from '../utils/types';

export type DropdownProps = {
	options: Stock[];
	onSelect: ( selected: Stock ) => void;
	selected: Stock[];
}

export const Dropdown: React.FC<DropdownProps> = ( {options, onSelect, selected} ) =>{
	const handleSelect = ( setSelectedStocks:Stock ) => {
		onSelect( setSelectedStocks );
	};

	const selectedHash = useMemo( () => {
		const hash:{[symbol:string]: boolean} = {};
		selected.forEach( item=>hash[item.symbol]=true );
		return hash;
	}, [selected] );

	const isOptionDisabled = ( option:Stock ) => {
		return selectedHash[option.symbol];		
	};

	return(
		<ul className='options'>
			{ options.map( option=>{
				return(
					<li key={ option.symbol } className='option'>
						<button 
							onClick={ ()=>handleSelect( option ) }
							disabled={ isOptionDisabled( option ) }
						>{ option.name }</button>
					</li>
				);
			} ) }
		</ul>
	); 
	
};