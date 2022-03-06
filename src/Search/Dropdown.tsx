import React from 'react';
import { Stock } from '../utils/types';

export type DropdownProps = {
	options: Stock[];
	onSelect: ( selected: Stock ) => void;
};

export const Dropdown: React.FC<DropdownProps> = ( {options, onSelect} ) =>{
	const handleSelect = ( setSelectedStocks:Stock ) => {
		onSelect( setSelectedStocks );
	};

	return(
		<ul className='options'>
			{ options.map( option=>{
				return(
					<li key={ option.symbol } className='option'>
						<button 
							onClick={ ()=>handleSelect( option ) }
						>{ option.name }</button>
					</li>
				);
			} ) }
		</ul>
	); 
	
};